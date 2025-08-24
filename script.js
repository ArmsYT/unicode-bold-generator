const boldMap = {
    A:'𝗔',B:'𝗕',C:'𝗖',D:'𝗗',E:'𝗘',F:'𝗙',G:'𝗚',H:'𝗛',I:'𝗜',J:'𝗝',K:'𝗞',L:'𝗟',M:'𝗠',N:'𝗡',O:'𝗢',P:'𝗣',Q:'𝗤',R:'𝗥',S:'𝗦',T:'𝗧',U:'𝗨',V:'𝗩',W:'𝗪',X:'𝗫',Y:'𝗬',Z:'𝗭',
    a:'𝗮',b:'𝗯',c:'𝗰',d:'𝗱',e:'𝗲',f:'𝗳',g:'𝗴',h:'𝗵',i:'𝗶',j:'𝗷',k:'𝗸',l:'𝗹',m:'𝗺',n:'𝗻',o:'𝗼',p:'𝗽',q:'𝗾',r:'𝗿',s:'𝘀',t:'𝘁',u:'𝘂',v:'𝘃',w:'𝘄',x:'𝘅',y:'𝘆',z:'𝘇',
    À:'𝗔',Â:'𝗔',Ä:'𝗔',É:'𝗘',È:'𝗘',Ê:'𝗘',Ë:'𝗘',Î:'𝗜',Ï:'𝗜',Ô:'𝗢',Ö:'𝗢',Ù:'𝗨',Û:'𝗨',Ü:'𝗨',Ç:'𝗖',
    à:'𝗮',â:'𝗮',ä:'𝗮',é:'𝗲',è:'𝗲',ê:'𝗲',ë:'𝗲',î:'𝗶',ï:'𝗶',ô:'𝗼',ö:'𝗼',ù:'𝘂',û:'𝘂',ü:'𝘂',ç:'𝗰'
};


function convertText() {
    const input = document.getElementById("inputText").value;
    let result = '';
    for (let char of input) {
        result += boldMap[char] || char;
    }
    document.getElementById("outputText").value = result;
}

function copyText() {
    const output = document.getElementById("outputText");
    output.select();
    document.execCommand("copy");
}
