const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const coolCats = require("./coolcats.json");
const doodles = require("./doodles.json");

const impostors = require("./impostors.json");
app.use(cors());
app.use(express.json());

// now in the files[] we can fetch based on the contract that the user req (when req the nft collection) we can psss the files[]
const files = [
  {
    contract: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    data: doodles
  },
  {
    contract: "0x1a92f7381b9f03921564a437210bb9396471050c",
    data: coolCats,
  },
]

app.get("/nftCollection", async (req, res) => {
  const { query } = req;


  let data;

  try{
    // we'll get the files[] and find the 1st match, each elem in the files[] will get the contract and we'll check if the query (we sent over nftcollection endpt) is eq to contract param then we'l get the file[obj] and extract the data key which has the json file  
    data = files.find((e)=> e.contract === query.contract).data 
  } catch(e){
    return res.status(400);
  }

  return res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`Listening for API Calls`);
});
