# Solutions and Explanations for HW 4

Hello! In this README file, I will be explaining my submission for Homework 4 for SSW 345. 

The only file that was altered was the index.js file, which was necessary for the completion of the assignment.
The rest of the files were left alone. 

In the index.js file, four functions were altered, as per the directions in the homework.
The four functions were listBranches, createRepo, createIssue, and enableWikiSupport.

For most, the changes are small and self-explanatory.

*listBranches* had a one line change, where the path of the branches for this repo were specified. 

*createRepo* had the most changes. A path was specified and an object was instantiated with a name, a description, and whether the repo is public or private.
However, if the repo already existed, the program would get a 422 error.
To remedy this, a delete function was included in the create function.
Unfortunately, this causes an error to pop up at first, because the repo already exists. However, running the test twice properly deletes and recreates the repo, resulting in no error.

*createIssue* had some changes, which involved changing the path as well as initializing an object with both issueName and issueBody, a name and a description. 

*enableWikiSupport* also had some changes, which invloved changing the path as well as initializing an object with has_wiki, and setting it to true. This enables Wiki support for the repo. 

On my end, the code runs the test cases perfectly. Again, as mentioned before, one might need to run the test twice to get all to pass, but they all do pass.

[Here](https://youtu.be/XyrEKyzqYU8) is a YouTube link to the second portion of the assignment, the screencast portion. 

Thank you!
