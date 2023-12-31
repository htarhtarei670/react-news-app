import { logDOM } from "@testing-library/react";
import { useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase";

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

const initialFacts = [
  {
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
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
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

function App() {
  const [showForm,setShowForm]=useState(false);
  const [facts,setFact]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const[currentCategory,setCurrentCategory]=useState('all');

  useEffect(function(){
    const getData=async function(){
      let query=supabase
      .from('fact')
      .select('*');

      if(currentCategory !== "all"){
       query= query.eq("category",currentCategory)
      }

      let { data: fact, error } = await query
      .order("text",{ascending:true})
      .limit(1000)

      setIsLoading(false);
      setFact(fact);
    }
    getData();
  },[currentCategory])

    return (
     <> 
       <Header setShowForm={setShowForm} show={showForm}/>
        {showForm?<FormGroup setFact={setFact} setShowForm={setShowForm}/>:null};

        <main className="main">
          <CategoryFliter setCurrentCategory={setCurrentCategory}/> 
          {isLoading?<Loader/>:<FactList facts={facts}/>}

        </main>
     </>   
      );
}

function Header({setShowForm,show}){
  const appTitle="React News"
  return(
    <header className="header">
      <div className="logo">
          <img src="/images/logo.png" alt="this is website logo" width="68" height="68"/>
          <h1>{appTitle}</h1>
      </div>
      <button className="btn btn-large share-btn" onClick={()=>setShowForm(show=>!show)}>
      {show?"Close":"  Share A Fact"}
      </button>
  </header>
  )
}

//this is validation if source cann't be text string or num
function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function Loader(){
  return <h1 className="loading">Loading... </h1>
}

function FormGroup({setFact,setShowForm}){
  const [text,setText]=useState("");
  const[source,setSource]=useState("");
  const[category,setCategory]=useState("");
  const[isUploading,setIsUploading]=useState(false);

  const textLength=text.length;

  //when I submit this function start working
  const handleSumit=async (e)=>{
    //to stop default loading of browser
    e.preventDefault();

    //to check user's text have or not....if it has to create new form
    if(text && isValidHttpUrl(source) && category){

      //to store data in supabase 
      const { data:newFact, error } = await supabase
      .from('fact')
      .insert([
        { text,category,source },
      ]).select("*")

      setIsUploading(true);
      console.log(newFact);

      // //to change fact to fact obj
      // const newFact={
      //   id: Math.round(Math.random)*1000000,
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear,
      // }
      // //to show new fact on UI and create state
      // setFact((currentFact)=>[newFact,...currentFact]);


      //to delete data from form
      setText("");
      setCategory("");
      setSource("");
      
      //to close form
      setShowForm(false);
    }  

  }
  return(
    <form className="form-group" onSubmit={handleSumit}>
        <input type="text" placeholder="Share A Fact With A Words...." value={text} onChange={(e)=>setText(e.target.value)} disabled={isUploading}/> 
        <span>{200-textLength}</span>
        <input type="text" placeholder="Trustworthy Source" value={source} onChange={(e)=>setSource(e.target.value)} disabled={isUploading}/>
        <select name="" value={category} onChange={(e)=>setCategory(e.target.value)} disabled={isUploading}>
            <option value="">CHOOSE CATEGORY</option>
            {CATEGORIES.map(cat=>
              <option value={cat.name} key={cat.name}>{cat.name.toUpperCase()}</option>
            )}
        </select>
        <button className="btn btn-large">Post</button>
    </form> 
  )
}


function CategoryFliter({setCurrentCategory}){
  return(
    <aside>
      <ul>
        <li><button class="btn btn-category btn-all-cate" onClick={()=>setCurrentCategory('all')}>All</button></li>
          {
            CATEGORIES.map(cat=>
              <li key={cat.name}>
                <button class="btn btn-category" style={{ background:cat.color }} onClick={()=>setCurrentCategory(cat.name)}>{cat.name}</button>
              </li>
            )
          }     
      </ul>
    </aside>
  )
}


function FactList({facts}){
  if(facts.length === 0){
    return <h1 className="loading">There is no fact for this category...Let Create One! </h1>
  }
  else{
    return(
      <section>
        <ul class="fact-group">
        {
          facts.map(fact=>
            <Fact factObj={fact} key={fact.id}/> 
          )
        }
        </ul>
        <p>There are {facts.length} facts.</p>
      </section>
  )
  }
}
 

function Fact({factObj}){
  return(<li class="facts">
        <p class="fact">
            {factObj.text}
            <a href="{factObj.source}" target="_blank">(source)</a>
        </p>
        <span class="tag" style={{backgroundColor:CATEGORIES.find(col=>col.name ===factObj.category).color}}> #{factObj.category}#</span>
        <div class="reacts">
            <button>👍 {factObj.votelike}</button>
            <button>❤️ {factObj.voteheart}</button>
            <button>😢 {factObj.votesad}</button>
        </div>
    </li>)
}

export default App;