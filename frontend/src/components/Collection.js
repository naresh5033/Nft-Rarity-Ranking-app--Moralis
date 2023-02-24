import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collections } from "../collections.js";
import { getImage } from "../helpers/GetImage.js";
import { Breadcrumb, Input, Layout, Card, Button, Modal } from "antd";
import axios from "axios";

const { Search } = Input;
const { Content } = Layout;

//lets fetch the data for the each nft collection

function Collection() {
  const [currentCollection, setCurrentCollection] = useState(null);
  const [allTokens, setAllTokens] = useState(null);
  const [displayedTokenList, setDisplayedTokenList] = useState(null); // the displayed tkn will be the 1st 12/24 elem of our all tkn
  const [selectedToken, setSelectedToken] = useState(null); // to show the modal for the particular selected tkn, and below we can use it inside the onclick event

  // the params from the path /collection/:contract .. this will allow us to extract into the contract var the current contract that we re on..
  const {contract} = useParams();

  function onSearch(id){

    const i = allTokens.findIndex((e) => e.token_id === id)

    setSelectedToken(i)
  }

  // lets fetch the collections from our bakend using the contract param
  async function getCollection(contract){

    const res = await axios.get(`http://localhost:3001/nftCollection`, {
      params: { contract: contract },
    });
    // as the resp(from backend) is an obj of objs we ve to change it to array of obj, so its easier to handle
    const rarityArray = Object.values(res.data);
    setAllTokens(rarityArray);
    console.log(rarityArray);
    setDisplayedTokenList(rarityArray.slice(0, 12));

  } // use the getCollecton() inside the useEffect()


  useEffect(()=>{

    try {
      const col = collections.find((e) => e.contract === contract);
      setCurrentCollection(col);
      getCollection(contract)
    } catch (e) {
      setCurrentCollection(null);
    }

  },[contract])

  return (
    <>
      <Modal
        width={1000}
        open={selectedToken || selectedToken === 0} // 0 - false
        footer={null}
        onCancel={() => {
          setSelectedToken(null);
        }}
      >
        {(selectedToken || selectedToken === 0) &&
        
        (
          <>
            <div className="modalTitle">
              {`Rank ${selectedToken + 1} (#${allTokens[selectedToken].token_id})`}
            </div>
            <div className="modalContent">
              <img
                alt="modalImg"
                className="modalImg"
                src={getImage(allTokens[selectedToken].metadata)}
              ></img>
              <div className="tableOfScores">
                <div className="totalScore">
                  {`Total Rarity Score ${allTokens[selectedToken].total_rarity_score.toFixed(2)}`}
                </div>
                <div className="tableRow">
                  <div className="tableRowOne" style={{fontWeight:"bold"}}>TRAIT</div>
                  <div className="tableRowTwo" style={{fontWeight:"bold"}}>VALUE</div>
                  <div className="tableRowThree" style={{fontWeight:"bold"}}>SCORE</div>
                </div>
                {JSON.parse(allTokens[selectedToken].rarity_scores).map(
                  (e, i) => {
                    return (
                      <>
                        <div className="tableRow" key={`${i}row`}>
                          <div className="tableRowOne">{e.trait_type}</div>
                          <div className="tableRowTwo">{e.value}</div>
                          <div className="tableRowThree">
                            {e.rarity_score.toFixed(2)}
                          </div>
                        </div>
                      </>
                    );
                  }
                )}
              </div>
            </div>
          </>


        )}
      </Modal>
      <Content className="mainContent">
        {currentCollection && (
          <>
          <div className="collectionHeader">
            <div>
            <Breadcrumb>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Collections</Breadcrumb.Item>
                  <Breadcrumb.Item>{currentCollection.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="collectionPageName">
                  {currentCollection.name}
            </div>
            <div className="collectionPageContract">
                  {currentCollection.contract}
            </div>
            <Search
                  onSearch={onSearch}
                  placeholder="Token ID"
                  allowClear
                  enterButton="Search"
                  size="large"
              />
            </div>
            <img
                className="collectionPageLogo"
                src={currentCollection.img}
                alt="collectionLogo"
            />
          </div>
          <div className="homeTrending">RANKING</div>
          <div className="listOfNFTs">
            {displayedTokenList?.map((e,i)=>{
              return(
                <Card
                    onClick={() => setSelectedToken(i)}
                    key={i}
                    hoverable
                    style={{ width: 180 }}
                    cover={<img alt={e.token_id} src={getImage(e.metadata)} />}
                  >
                    <div className="rankAndId">
                      <div className="rankSingle">{`RANK ${i + 1}`}</div>
                      <div className="idSingle">{`#${e.token_id}`}</div>
                    </div>
                </Card>
              )
            })}    
          </div>
          <Button
              type="primary"
              className="loadMore"
              onClick={(e) => {
                setDisplayedTokenList(
                  allTokens.slice(0, displayedTokenList.length + 6) // load more btn-- displays the current the current tkn list(12 tkns) + 6 more(additional row) tkns by rarity
                );
              }}
            >
              Load More
          </Button>
          </>
        )}
      </Content>
    </>
  );
}

export default Collection;
