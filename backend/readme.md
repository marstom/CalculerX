REST API:



// get task from tasks poool
Task are from 0 to x
x - number of tasks
URLS
GET
/number
{
    number_tasks: 6
}

/tasks?q=3
{
    task: '2 + 3 + 4'
}

/tasks
{
    task: ['2 + 3 + 4', '2 + 3 + 4', '2 + 3 + 4', ...  ]
}

POST:
// perform action add new task
{
    task: '2 + 3 + 4'
}

