(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
    //項目初期化
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    //ボタンクリック
    assessmentButton.onclick = function () {
        const userName = userNameInput.value;
        //テキストフィールドが空ならば終了　ガード句
        if (!userName.length) {
            return;
        }
        //結果初期化
        removeAllChildren(resultDivided);
        //結果
        const header = document.createElement('h2');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);
        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);
        //ツイート初期化
        removeAllChildren(tweetDivided);
        //ツイートタグ再現
        const ancher = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
        ancher.setAttribute('href', hrefValue);
        ancher.className = ('twitter-hashtag-button');
        ancher.setAttribute('data-text', result);
        ancher.setAttribute('data-lang', 'ja');
        ancher.setAttribute('data-show-count', 'false');
        ancher.innerText = '#あなたのいいところ をツイートする';
        tweetDivided.appendChild(ancher);
        //widgets.js実行
        twttr.widgets.load();
    };
    //テキストフィールド内でEnterキーを押したときもボタンクリックと同じ挙動を行う
    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            assessmentButton.onclick();
        }
    };
    const answers = [
        '【userName】のいいところは声です。【userName】の特徴的な声はみなを惹きつけ、心に残ります。',
        '【userName】のいいところはまなざしです。【userName】に見つめられた人は、気になって仕方がないでしょう。',
        '【userName】のいいところは情熱です。【userName】の情熱に周りの人は感化されます。',
        '【userName】のいいところは厳しさです。【userName】の厳しさがものごとをいつも成功に導きます。',
        '【userName】のいいところは知識です。博識な【userName】を多くの人が頼りにしています。',
        '【userName】のいいところはユニークさです。【userName】だけのその特徴が皆を楽しくさせます。',
        '【userName】のいいところは用心深さです。【userName】の洞察に、多くの人が助けられます。',
        '【userName】のいいところは見た目です。内側から溢れ出る【userName】の良さに皆が気を惹かれます。',
        '【userName】のいいところは決断力です。【userName】がする決断にいつも助けられる人がいます。',
        '【userName】のいいところは思いやりです。【userName】に気をかけてもらった多くの人が感謝しています。',
        '【userName】のいいところは感受性です。【userName】が感じたことに皆が共感し、わかりあうことができます。',
        '【userName】のいいところは節度です。強引すぎない【userName】の考えに皆が感謝しています。',
        '【userName】のいいところは好奇心です。新しいことに向かっていく【userName】の心構えが多くの人に魅力的に映ります。',
        '【userName】のいいところは気配りです。【userName】の配慮が多くの人を救っています。',
        '【userName】のいいところはその全てです。ありのままの【userName】自身がいいところなのです。',
        '【userName】のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる【userName】が皆から評価されています。',
    ];
    const ansLen = answers.length;
    function assessment(userName) {
        let sumOfcharCode = 0;
        for (let i = 0, len = userName.length; i < len; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }
        return answers[sumOfcharCode % ansLen].replace(/【userName】/g, userName);
    }
})(); 
