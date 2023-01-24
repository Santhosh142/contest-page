images = {
	hackerrank : "https://repository-images.githubusercontent.com/252038286/a3e20f07-cc45-4b8d-85f9-9c7e076ab570", // ProjectEuler+
	hackerearth : "https://static-fastly.hackerearth.com/static/hackerearth/images/logo/HE_logo.png", // Cloudera, Hackathon, Build A, Netcore, January Circuits, IPETRONIK, Intel, Brother Printers, Skill-a-thon
	codeforces : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png", // Abakoda, JCPC, Codeforces, VK,  ICPC, Div.
	atcoder : "https://img.atcoder.jp/assets/top/img/logo_bk.svg", // AtCoder
	codechef : "https://img.icons8.com/color/480/codechef.png", // Amalthea, Starters, RECode, 
	leetcode : "https://cdn.iconscout.com/icon/free/png-256/leetcode-3521542-2944960.png", // Weekly, Biweekly
	google : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Google_Name.svg/2560px-Google_Name.svg.png" // Kick Start, Round,

}
let getImageUrl = (contestName) => {
    if(contestName.includes("hackerrank")) 
    {
        return images["hackerrank"];
    }
    else if(contestName.includes("codeforces"))
    {
        return images['codeforces']
    }
    else if(contestName.includes("atcoder"))
    {
        return images['atcoder']
    }
    else if(contestName.includes("codechef"))
    {
        return images['codechef']
    }
    else if(contestName.includes("leetcode"))
    {
        return images['leetcode']
    }
    else if(contestName.includes("google"))
    {
        return images['google']
    }
    return images['hackerearth'];
}

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}

let p = fetch('https://kontests.net/api/v1/all');

let demo = document.getElementsByClassName('container')[0];



p.then((response) => {
    return response.json();
}).then((contests) => {
    console.log(contests[0]);
    for(item in contests) {
        let startDate = new Date(contests[item].start_time);
        let endDate = new Date(contests[item].end_time);
        startDate = startDate.toLocaleDateString() + " - " + startDate.toLocaleTimeString();
        endDate = endDate.toLocaleDateString() + " - " + endDate.toLocaleTimeString();
         
        let contestName = contests[item].name;

        let url = getImageUrl(contests[item].url);

        const arr = contestName.split(" ");

        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }

        const capitalizedName = arr.join(" ");

        demo.innerHTML += `
            <div class="card">
                <div class="imageCard">
                    <img src="${url}" alt="Image not found" >
                </div>
                <div class="contentCard">
                    <div class="name">
                        ${capitalizedName}
                    </div>
                    <div class="details">
                            <b>Start Date: </b> ${startDate}<br>
                            <b>End Date  : </b> ${endDate}
                        <button> <a href = '${contests[item].url}' target = '_blank'>Check here</a> </button>

                    </div>
                </div>
            </div>
        `
    }
})
