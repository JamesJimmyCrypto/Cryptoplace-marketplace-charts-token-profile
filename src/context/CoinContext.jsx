import { createContext, useEffect, useState } from "react";


export const CoinContext = createContext()

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: 'usd',
        symbol: '$'
    })

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': 'CG-6in93khyrxLX4jamXUjuhY1P	'
            }
          };

          try{
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
            if(!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setAllCoin(data)
          }
          catch(err){
            console.log(err);
          }
    }

    useEffect(()=> {
        fetchAllCoin();
    }, [currency])

    const contextValue = {
        allCoin, currency, setCurrency

    }
    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;