let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1; //月は0~11で取得されるため、+1をする


window.onload = () => { //ページ読み込みと同時にshowCalendarを実行する。これがないと初期状態で何も出力されない。
    showCalendar();
    deleteCell();
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
    deleteCell();
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
    deleteCell();
});

let showCalendar = () => {
    //年を表示
    let htmlYear = document.querySelector("#year");
    htmlYear.innerText = year;

    //月を表示
    let htmlMonth = document.querySelector("#month");
    htmlMonth.innerText = month;

    //月初が何曜日なのかを取得
    let firstDay = new Date(year, month - 1, 1).getDay();  //曜日なのでgetDay()

    //月末が何日なのかを取得
    let lastDate = new Date(year, month, 0).getDate();  //日にちなのでgetDate()

    //変数
    let count = 1; //カレンダーの日付にあたる変数
    let calendar = ""; //この中にカレンダーを作り、最後にHTMLに出力する

    //カレンダーの曜日部分を作成
    calendar += "<table>" + "<tr>"; //=ではなく+=にするのを忘れずに

    let weeks = ["日", "月", "火", "水", "木", "金", "土"];
    for(let i = 0; i < weeks.length; i++){
        calendar += "<td>" + weeks[i] + "</td>";
    }
    calendar += "</tr>";

    //カレンダーの日付部分を作成
    for(let i = 0; i < 6; i++){ //カレンダー日付部分の行数は最大で6である
        calendar += "<tr>";
        for(let j = 0; j < 7; j++){
            //月初を調整
            if(i === 0 && j < firstDay) { //1週目かつ月初の曜日よりも早いとき、空白で出力
                calendar += "<td></td>";

            //月末を調整
            }else if(count > lastDate) { //countが月末の日付を超えたら、残りは空白で埋める
                calendar += '<td class="empty"></td>'; //コード中で<td>要素にclass属性を追加したい場合、外側は''で囲む

            //空白以外の部分
            }else{
                
                //今日を表示
                if(year === date.getFullYear() && month === date.getMonth() + 1 && count === date.getDate()){
                    calendar += '<td id="today">' + count + "</td>";
                    count += 1;

                //その他の日
                }else{
                    calendar += "<td>" + count + "</td>";
                    count += 1; 
                }
            }
        }
        calendar += "</tr>";
    }
    calendar += "</table>";

    //htmlに出力する
    let htmlCalendar = document.querySelector("#calendar");
    htmlCalendar.innerHTML = calendar;
};

//日付部分が5行で収まった場合、6行目の余分なセルを消す関数
let deleteCell = () => {
    let table = document.querySelector("table");
    let lastRow = table.rows[6];
    let lastCell = table.rows[6].cells[0];
    if(lastCell.classList.contains("empty")){
        lastRow.classList.add("delete");
    }
}

//todoリスト作成
//（＋）ボタン
let addBtn = document.querySelector("#addBtn");
let mask = document.querySelector("#mask");
let note = document.querySelector("#note");

addBtn.addEventListener("click", () => {
    mask.classList.replace("delete", "open");
    note.classList.add("open");
});

mask.addEventListener("click", () => {
    mask.classList.replace("open", "delete");
    note.classList.remove("open");
});

//todoリスト本体
let output = document.querySelector("#output");
let textarea = document.querySelector("textarea");
let saveBtn = document.querySelector("#saveBtn");
let deleteBtns = document.querySelectorAll(".deleteBtn");
let list = [];

// 追加ボタンをクリックしたときの処理
saveBtn.addEventListener("click", () => {
    if(textarea.value){
        list.push(textarea.value);
        localStorage.setItem("todo", JSON.stringify(list)); //todoをkeyとし、JSON形式で保存
        textarea.value = "";
        output.textContent = ""; // outputの内容を一旦消す
        showList();
    }else{
        alert("予定が入力されていません");
    }

});

// リスト表示
let showList = () => {
    let outputHTML = "";
    for(let i = 0; i < list.length; i++) {
        outputHTML += '<div class="noteData">' + list[i] + '<button class="deleteBtn">×</button>' + "</div>";
    }
    output.innerHTML = outputHTML;

    // 削除ボタン
    deleteBtns = document.querySelectorAll(".deleteBtn");
    for(let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener("click", () => {
            list.splice(i, 1); //list[i]から1個の要素を取り除く
            localStorage.setItem("todo", JSON.stringify(list));
            showList();
        });
    }
}

// ページが読み込まれたときにlocalStorageからデータを読み込む
document.addEventListener("DOMContentLoaded", () => {
    let storedData = localStorage.getItem("todo");
    if(storedData) { //storedDataに何らかのデータが格納されているとき
        list = JSON.parse(storedData); //JSON形式の文字列をJavaScriptオブジェクトに変換
        showList();
    }else{ //storedDataが空のとき
        output.textContent = "予定がありません";
    }
});