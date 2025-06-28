# Github Action for Apex Corse's repos

This action is made to run on every Apex Corse's repo that needs notifications on pushes. Indeed it does the following things:

1. Activates on pushes of all kinds.
2. Takes the `github.event` object, relative to the push.
3. Parses it building a readable and informative message.
4. Sends it to Apex Corse's bot, `king`.

## Why this even exists?

Every technical department inside Apex Corse uses Github to track progress of their projects, but the software they're using and the way they work makes using branch-based development almost impossible. 

So they approach a trunk-based development, where everyone pushes changes directly to the `main` branch. The problem arises when literally everyone has to get notified of the pushed changes.

This action is therefore built for this purpose, allowing every member of the repo to be aware of the changes via a messaging provider like Telegram or Discord. Indeed, this action is strictly dependant of `king`, Apex Corse's official bot.
