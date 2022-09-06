("use strict");
//import the necessary libraries
import * as fs from "fs";
import promptSync from "prompt-sync";
const prompt = promptSync();

//import the stock data
let stock: any = fs.readFileSync("stock.json");
stock = JSON.parse(stock);

//import the transactions data
let transactions: any = fs.readFileSync("transactions.json");
transactions = JSON.parse(transactions);

//allow user to inpurt sku
let inputSKU = prompt("Enter SKU");

// Create SKU type for function
type SKU = {
  sku: string;
  qty: number;
};

//create a function which is able to return the current stock levels for a given SKU
async function matchedSKU(sku: string): Promise<SKU[]> {
  //set the quantity as 0 as default
  let stockLevel = 0;
  // filter the stock array to find the inputSKU
  let individualStock = stock.find((stock: any) => {
    return stock.sku == inputSKU;
  });
  // filter the transactions array to find the inputSKU
  let individualTransaction = transactions.find((transaction: any) => {
    return transaction.sku == inputSKU;
  });
  //if the sku exists in both files then return the stock number
  if (individualStock != null && individualTransaction != null) {
    stockLevel = individualStock.stock;
  }
  //throw an error where the SKU does not exist in the `transactions.json` and `stock.json` file
  else if (individualStock == null && individualTransaction == null) {
    throw new Error("SKU Does Not Exist");
  }
  //if no errors, then return the stock level
  return [
    {
      sku: sku,
      qty: stockLevel,
    },
  ];
}

//console log the output
console.log(matchedSKU(inputSKU));
