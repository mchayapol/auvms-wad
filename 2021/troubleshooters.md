# Troubleshooters
## Unable to run `npx` or `yarn create` on Windows.
Main cause is the space in the directory name. Shell command is broken into tokens; 
therefore space is the user's home directory causes the problem.
1. Check LOCALAPPDATA system variable
```
$ echo %LOCALAPPDATA%
C:\Users\Chayapol Moemeng\AppData\Local
```
### Solution
1. Create symbolic link to the user home directory.
without space by running `mklink` with Adminstrator's permission.
```
$ mklink C:\Users\Chayapol "C:\Users\Chayapol Moemeng"
```
2. Now that we can access the home directory with another name with no spaces in it. Set the system variable to the newly linked directory
```
LOCALAPPDATA=C:\Users\Chayapol
```
