import React, { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
 
 const [amount, setamount]= useState();
 const [fromcurrency, setfromcurrency] = useState("USD")
 const [tocurrency, settocurrency] = useState("INR")
 const [Convertedamount, setconvertedamount] = useState(null)
const [exchangerate, setexchangerate] = useState(null)

 const handleamount = (evt) =>{
  setamount(evt.target.value)
 }      

 const handlefrom = (evt) =>{
  setfromcurrency(evt.target.value)
 }

 const handleto = (evt) =>{
    settocurrency (evt.target.value)
 }
 
 
 useEffect(()=>{
  const getexchangerate = async()=>{
    try{
      const url = `https://api.exchangerate-api.com/v4/latest/${fromcurrency}`;

      const response = await axios.get(url);
      // console.log(response)
      setexchangerate(response.data.rates[tocurrency])

    }catch (error){
      console.error("error fetching exchangerate:", error)
    }
  }
   getexchangerate()
 },[fromcurrency, tocurrency])
 
 useEffect (()=>{
  if(exchangerate !== null){
    setconvertedamount((amount * exchangerate).toFixed(2))

  }
 },[amount, exchangerate])
 
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full ">
          <h1 className="text-2xl font-bold text-fuchsia-500 mb-6 text-center">
            Currency Converter
          </h1>
          
          <div className="mb-4">
            <label htmlFor="amt" className="block text-sm font-medium text-fuchsia-800">Amount:</label>
            <input
            value={amount}
            onChange={handleamount}
              type="number"
              id="amt"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fromCurrency" className="block text-sm font-medium text-fuchsia-800">From Currency:</label>
            <select
            value={fromcurrency}
            onChange={handlefrom}
              id="fromCurrency"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="toCurrency" className="block text-sm font-medium text-fuchsia-800">To Currency:</label>
            <select
            value={tocurrency}
            onChange={handleto}
              id="toCurrency"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>

          <div className="text-center mt-6">
            <p className="text-lg font-semibold text-fuchsia-800">{amount} {fromcurrency} is Equal to {Convertedamount} {tocurrency}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App