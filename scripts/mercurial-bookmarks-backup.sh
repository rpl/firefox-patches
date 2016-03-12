BOOKMARKS=`hg bookmarks | awk -e '{ print $1 }' | grep -v fx-team`
IS_DIRTY=`hg status -madu | wc -l`

if [[ $IS_DIRTY -gt 0 ]]; then
  echo "Mercurial Repo is DIRTY."
  exit 1
fi

current_bookmark() {
  hg log --template '{if(currentbookmark, "{currentbookmark}", if(fxheads, "{fxheads}", "{tags}"))}' -r .
}

OLD_BOOKMARK=`current_bookmark`

backup_bookmark() {
  local bookmark_dir=`echo $1 | cut -d / -f 1`
  mkdir -p ../FIREFOX_PATCHES/$1

  hg update -r $1
  hg log -r 'pending'
  hg export -g -r 'pending' -o "../FIREFOX_PATCHES/$1/%n-%m.patch"
}

for bookmark in $BOOKMARKS; do
  echo "backup BOOKMARK: $bookmark"
  backup_bookmark $bookmark
done

echo RESTORE OLD_BOOKMARK: $OLD_BOOKMARK
hg update -r $OLD_BOOKMARK
