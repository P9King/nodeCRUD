
let likeBtn = document.querySelector('.likeBtn');
let active = document.querySelector('.likeBtn.active');
const boardId = document.getElementsByName('boardId')[0].value;
const writerId = document.getElementsByName('writerId')[0].value;
const modifyBtn = document.querySelector('.modifyBtn');
const deleteBtn = document.querySelector('.deleteBtn');

//like
let count = 0;
function like() {
    likeBtn.classList.toggle('active');

    if (count % 2 == 0) {
        const like = {
            click: 1,
            boardId: boardId
        };

        fetch('/clickLike', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(like),
        })
    } else {
        const like = {
            click: -1,
            boardId: boardId
        };
        fetch('/clickLike', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(like),
        })
    }

    count++;
}

//
function modifyBoard() {
    const checkId = {
        checkId: writerId,
        boardId: boardId
    }

    console.log(checkId);

    fetch('/modifyAuth', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(checkId)
    }).then((result) => result.json())
        .then((data) => {
            if (data.result == 0) {
                console.log(data);
                alert('login first');
                location.href = "/";
            } else if (data.result === 'no permission') {
                console.log(data);
                alert('no permissions');
            } else {
                console.log(data.result);
                location.href = `/modifyBoard/${data.result}`;
            }
        })


}

function deleteBoard() {
    if (confirm('Want to delete?')) {
        const checkId = {
            writerId: writerId,
            boardId: boardId
        }
        console.log(checkId);

        fetch('/deleteBoard', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(checkId)
        }).then((result) => result.json())
            .then((data) => {
                if (data.result == 'success') {
                    location.href = '/main'
                } else {
                    alert(data.result)
                }
            });
    }
}


likeBtn.addEventListener('click', like);
modifyBtn.addEventListener('click', modifyBoard);
deleteBtn.addEventListener('click', deleteBoard);