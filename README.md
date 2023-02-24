### NFT Rarity 

- The nft rarity is specially used for the pfp profile picture nft where there is thousands and thousands of nfts but any single nft in this collection can form to a std trait type collection, the val of the trait type for each nft varies and this can give rarity, coz the occurance of each trait type is different.
- There are many rarity calculating tools available for ex rarity sniper etc..
- we can calculate the rarity of a trait by using this simple formula--> Rarity percent = no. of items in traits % no. of items in collection, this will give us the rarity but the problem with this approach is its "linear"
- we can use the rarity score --> Rarity Score = 1 % Rarity percentage, this will give us an inversely proportional ratio, so our rarity score increases exponentially as the rarity percentage goes down..
  
We gon use moralis api to fetch an entire nft collection on any evm chain.. and for the data analysis part we ve used python for calculating the rarity of each nft based on their trade attributes and then for the backend we ve used node js (express), and for the frontend we used the React framework

# Data Analytics (pandas)

- We ve to calculate the rarity for all 10,000 of this nfts by using the python.
- for this we gon use the moralis evm api and pandas ```pip install pandas moralis```
- with the base plan we can only make 5 moralis api calls 

## Backend 

The backend is a simple node js (express) server which will get all the rarity scores from the nft collection json file (that we got from the py script) ex : doodles.json, coolcat.json, imposter.json etc 
- when we get the req from our frontend we ve to res/send the json for the corresponding collection

## Frontend 

For the frontend we will use React framework, and the ant design(antd) layout.\

The collections.js file will brings in the logo images for the top nft collections that we chosen(such as bored apes, doodle, imposter aliens, bean2, mfers etc) for our rarity ranking page 
- and the data that we fetched by using the moralis evm api, we will use that infos to start populating the data on the collection page  
- so the data fetching logic(req to our backend and fetching all the resp) for our nft collection(with the rarity score and the ranking) is in the collection.js

- finally we can make a req to our backend for the particular nft collection with the contract param --> ```localhost:3001/nftcollection?contract=doodle contract addr ```