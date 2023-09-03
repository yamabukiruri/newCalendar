let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1; //月は0~11で取得されるため、+1をする


window.onload = () => { //ページ読み込みと同時にshowCalendarを実行する。これがないと初期状態で何も出力されない。
    showCalendar();
}

//前月に戻る
let prev = document.querySelector("#prev");
prev.addEventListener("click", () => {
    month -= 1;
    if(month === 0){
        month = 12;
        year -= 1;
    }
    showCalendar(); //ボタンを押すたびにshowCalendar()を実行するようにしないと、カレンダーが更新されない
});

//来月に進む
let next = document.querySelector("#next");
next.addEventListener("click", () => {
    month += 1;
    if(month === 13){
        month = 1;
        year += 1;
    }
    showCalendar(); //ボタンを押すたびにshowCalendar()を実行するようにしないと、カレンダーが更新されない
});

showCalendar = () => {
    //年を表示
    let htmlYear = document.querySelector("#year");
    htmlYear.innerText = year;

    //月を表示
    let htmlMonth = document.querySelector("#month");
    htmlMonth.innerText = month;
};
