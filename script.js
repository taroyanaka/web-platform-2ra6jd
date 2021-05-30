function addTextAndDqs(){
  generateHtml();
}

function generateDQS(what){
  const tag = what.replace("make","");
  document.querySelector(".textarea-1").value += [...Array(Number(document.querySelector(".volume").value)).keys()].map((V,IDX)=>`document.querySelector(".${tag}-${IDX}").value = "";\n`).join("");
}

function generateHtml(){
  const expr = document.querySelector("select").value;
  switch (expr) {
    case "maketextarea":
      document.querySelector(".textarea-0").value += maketextarea();generateDQS(expr); break;
    case "makeinput":
      document.querySelector(".textarea-0").value += makeinput();generateDQS(expr); break;
    case "makebutton":
      document.querySelector(".textarea-0").value += makebutton();generateDQS(expr); break;
    case "makediv":
      document.querySelector(".textarea-0").value += makediv();generateDQS(expr); break;
    case "makespan":
      document.querySelector(".textarea-0").value += makespan();generateDQS(expr); break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }
}
// generateHtml();

document.querySelector("select").innerHTML = `
<option value="maketextarea" class="maketextarea">maketextarea</option>
<option value="makeinput" class="makeinput">makeinput</option>
<option value="makebutton" class="makebutton">makebutton</option>
<option value="makediv" class="makediv">makediv</option>
<option value="makespan" class="makespan">makespan</option>
`;

// document.querySelector(".textarea-0").value = document.querySelector(".select-0").textContent;


function maketextarea(){ return [...Array(Number(document.querySelector(".volume").value)).keys()].map((V,IDX)=> `<textarea name="textarea-${IDX}" cols="10" rows="10" class="textarea-${IDX}" onclick=""></textarea>`).join("") }
function makeinput(){ return [...Array(Number(document.querySelector(".volume").value)).keys()].map((V,IDX)=> `<input type="text" class="input-${IDX}" onclick=""></input>`).join("") }
function makebutton(){ return [...Array(Number(document.querySelector(".volume").value)).keys()].map((V,IDX)=> `<button class="button-${IDX}" onclick=""></button>`).join("") }
function makediv(){ return [...Array(Number(document.querySelector(".volume").value)).keys()].map((V,IDX)=> `<div class="div-${IDX}" onclick=""></div>`).join("") }
function makespan(){ return [...Array(Number(document.querySelector(".volume").value)).keys()].map((V,IDX)=> `<span class="span-${IDX}" onclick=""></span>`).join("") }



// generateHtml(null);