#!/bin/bash
DEST_DIR=$1
BOOKMARKS=`hg bookmarks | awk '{ print $1 }' | grep -v fx-team`
IS_DIRTY=`hg status -madu | wc -l`

current_bookmark() {
  hg log --template '{if(currentbookmark, "{currentbookmark}", if(fxheads, "{fxheads}", "{tags}"))}' -r .
}

OLD_BOOKMARK=`current_bookmark`

backup_bookmark() {
  echo "backup BOOKMARK: $1"

  local bookmark_dir=`echo $1 | cut -d / -f 1`
  mkdir -p $DEST_DIR/$1

  hg update -r $1
  hg log -r 'pending'
  hg export -g -r 'pending' -o "$DEST_DIR/$1/%n-%m.patch"
}

if test "$2" = "all" ; then
  if test $IS_DIRTY -gt 0 ; then
    echo "ERROR: your repo is currently dirty"
    exit 1
  fi

  echo "Backup of all the bookmarks? (^C to exit)"
  read

  for bookmark in $BOOKMARKS; do
    backup_bookmark $bookmark
  done

  echo "restoring BOOKMARK: $OLD_BOOKMARK"
  hg update -r $OLD_BOOKMARK
else
  backup_bookmark $OLD_BOOKMARK
fi
