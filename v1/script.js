// when we click share btn,formgroup is appear or not
const shareBtn = document.querySelector('.share-btn');
const formGroup = document.querySelector('.form-group');
shareBtn.addEventListener('click', () => {
    if (formGroup.classList.contains('hidden')) {
        formGroup.classList.remove('hidden');
        shareBtn.textContent = 'Close'
    } else {
        formGroup.classList.add('hidden');
        shareBtn.textContent = 'Share A Fact';
    }
});



//get data from supabase with api
async function loadFun() {
    const res = await fetch("https://xkgvnlgeautlnvucwwaf.supabase.co/rest/v1/fact", {
        headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZ3ZubGdlYXV0bG52dWN3d2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxODQ5ODYsImV4cCI6MjAwMjc2MDk4Nn0.dqtahW1okgombqhUO-EKDbNPutd-OlReAzJd9XoRkTQ",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZ3ZubGdlYXV0bG52dWN3d2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxODQ5ODYsImV4cCI6MjAwMjc2MDk4Nn0.dqtahW1okgombqhUO-EKDbNPutd-OlReAzJd9XoRkTQ ",
        },
    });

    let data = await res.json();
    // const societyCategory = data.filter(e => e.category === "society");
    listDataAdd(data);

}
loadFun();



const initialFacts = [{
        id: 1,
        text: "React is being developed by Meta (formerly facebook)",
        source: "https://opensource.fb.com/",
        category: "technology",
        votesInteresting: 24,
        votesMindblowing: 9,
        votesFalse: 4,
        createdIn: 2021,
    },
    {
        id: 2,
        text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
        source: "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
        category: "society",
        votesInteresting: 11,
        votesMindblowing: 2,
        votesFalse: 0,
        createdIn: 2019,
    },
    {
        id: 3,
        text: "Lisbon is the capital of Portugal",
        source: "https://en.wikipedia.org/wiki/Lisbon",
        category: "society",
        votesInteresting: 8,
        votesMindblowing: 3,
        votesFalse: 1,
        createdIn: 2015,
    },
];

const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
];

const fact = document.querySelector('.fact-group');
let listDataAdd = (data) => {
    const facts = data.map((el) => {
        return `<li class="facts">
        <p class="fact">
            ${el.text}
            <a href="${el.source}" target="_blank">(source)</a>
        </p>
        <span class="tag" style="background-color: ${CATEGORIES.find(e => e.name === el.category).color};">#${el.category}#</span>
        <div class="reacts">
            <button>👍 ${el.votelike}</button>
            <button>❤️ ${el.voteheart}</button>
            <button>😢 ${el.votesad}</button>
        </div>
    </li>`;
    });
    fact.insertAdjacentHTML('afterbegin', facts);
}