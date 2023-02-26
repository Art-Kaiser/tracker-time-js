# tracker-time-js
>CLI application for counting time. This is a fan app for counting time using file format .txt.

>To get started: install node.js c npm and run the npm i && npm link command.

To separate by days, use a double dash <code>--</code>. The project on which work was carried out 
is marked with the hashtag <code>#</code>. Task record format 
"<code>task number</code> - <code>hours spent</code> <code>comments</code>".

<h3>Description:</h3>
<table>
    <tr>
        <td>command</td>
        <td>param</td>
        <td>description</td>
    </tr>
    <tr>
        <td><code>watch</code> or <code>w</code></td>
        <td><code>path</code> file path</td>
        <td>The <code>watch(path)</code> method monitors changes in the last block of the file 
            and outputs statistics to the console when saving the modified file</td>
    </tr>
    <tr>
        <td><code>calc</code> or <code>c</code></td>
        <td><code>path </code> file path</td>
        <td>The <code>calc(path)</code> method calculates the time and number of closed tasks on projects
        over the entire file and outputs it as a table to the console.</td>
    </tr>
</table>

<h3>Example of an entry in a file.txt</h3>
<pre>
--17.02
#project 1
<№task> - 3 this is the first comment
<№task> - 1.5

#project 4
<№task> - 2

--18.02
#project 1
<№task> - 2 this is the first comment
<№task> - 1
<№task> - 1
<№task> - 1.5 only the last comment is displayed
<№task> - 0.5

#project 2
<№task> - 2

#PROJECT-3
<№task> - 0.5 project consultation

#project4
<№task> - 0.5 a long comment will be truncated for convenient display in the table

#timetkr
000001 - 2 development TimeTraker modules
000002 - 1 refactoring project - Time tracker
000003 - 2 test
000004 - 2
</pre>

<h3>Example:</h3>  

Enter into the terminal 
<code>timetkr watch "G:/development/time.txt"</code>

result:
![img](https://user-images.githubusercontent.com/73838948/221440400-7b43f1c1-8ef6-47a7-b1a3-3c741751a947.png)

<code>timetkr calc "G:/development/time.txt"</code>

result:
![img_1](https://user-images.githubusercontent.com/73838948/221440405-f91b519c-64b0-403b-a0e6-d503a14d7652.png)

