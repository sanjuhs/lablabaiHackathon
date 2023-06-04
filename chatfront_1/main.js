const chatBox = document.querySelector(".chat-box");
const inputField = chatBox.querySelector("input[type='text']");
const button = chatBox.querySelector("button");
const chatboxbody = chatBox.querySelector(".chat-box-body");

button.addEventListener("click", sendMessage);

let chatHistory = "";

inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = inputField.value;
  if (message.includes("/cardrec")) {
    preprompt = `Here is the Chat history of a Credit card  analyst and a customer. Analyze the conversation and choose the best card that fits the customers preferences based on the conversation. \n\nConversation:
       ${chatHistory}
      \n\n Cards available to recommend: 
      1. Axis Bank MY ZONE Credit Card - Movies(SonyLiv,Paytm),Rewards(EDGE Points), Dining Discounts (EazyDiner,Swiggy), Lounge Access (MasterCard/Visa lounge access),Travel Benefits (complimentary lounge access),Milestone Benefits (SonyLiv membership renewal),Fuel Surcharge Waiver(1% fuel surcharge waiver), Reward Redemption( shopping/travel vouchers, EDGE Rewards Portal),EMI Conversion,Insurance,Shopping(Ajio) ,Low Fees
      2. HDFC Bank MoneyBack Plus Credit Card - Cashback(Amazon, Flipkart,  Big Basket, Reliance Smart Superstore, Swiggy), Rewards (CashPoints,Airmiles), Dining Discounts (2000 premium restaurants),Fuel Surcharge Waiver, Welcome Benefits(500  CashPoints), Milestone Benefits(Rs.2000 gift vouchers),EMI Conversion(Merchant/EasyEMI, Aggregator EMI and Brand EMI), Reward Redemption( statement cash, flight/hotel bookings, product catalog,Airmiles), Low Fees,  Insurance,Lounge Access, Shopping(SmartBuy)
      3. AU Bank LIT Credit Card: - Low Fees, Cashback (Zee5,Amazon Prime ), Rewards  (Zee5,Amazon Prime), Travel Benefits (complimentary lounge access), Dining Discounts, Membership Benefits (Zee5, Amazon Prime),Shopping Benefits (CultFit), Milestone Benefits( additional 5% cashback),Reward Redemption,Movies (Zee5),Fuel Surcharge Waiver(1% fuel surcharge waiver),Lounge Access(complimentary lounge access)
      4. Cashback SBI Credit Card - Cashback(5% online transaction, 1% offline transaction), Rewards, Dining Discounts , Fuel Surcharge Waiver(1% fuel surcharge waiver), Welcome Benefits, Milestone Benefits(Rs.2 lakh annual spend),EMI Conversion , Reward Redemption(statement cash), Low Fees(free add on cards), Travel Benefits, Insurance, Lounge Access
      5. SBI SimplyCLICK Credit Card - Shopping(Amazon, Cleartrip),Rewards, Dining Discounts , Fuel Surcharge Waiver, Welcome Benefits(Amazon e-voucher), Milestone Benefits(ClearTrip e-vouchers),EMI Conversion , Reward Redemption(sbicard.com), Low Fees, Travel Benefits, Insurance, Lounge Access,Movies(BookMyShow)

      please recommend the customer one amongst the above cards by using their conversation, intrests, spends, purchase history etc.`;
    // chatHistory = chatHistory + "\n\nHuman: " + message;
    console.log(message);
    inputField.value = "";
    chatboxbody.innerHTML += `<div class="message">${message}</div>`;
    scrollToBottom();
    fetch("http://localhost:3000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: preprompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        // chatHistory = chatHistory + "\n\nAsistant: " + data.message;
        chatboxbody.innerHTML += `<div class="response">${data.message}</div>`;
        scrollToBottom();
      });
  } else {
    let longpreprompt =
      "You are a Consumer credit card research analyst tasked with finding my prefrences in credit cards. Please ask me questions on my spending habits and my credit card purchases. Remeber to continue following up with questions from the previous conversations as well.";
    let continuouspreprompt =
      "please help me analyze my spends so that you can eventually recommed a good credit card";
    chatHistory = chatHistory + "\n\nHuman: " + continuouspreprompt + message;
    console.log(message);
    inputField.value = "";
    chatboxbody.innerHTML += `<div class="message">${message}</div>`;
    scrollToBottom();
    fetch("http://localhost:3000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: longpreprompt + chatHistory }),
    })
      .then((response) => response.json())
      .then((data) => {
        chatHistory = chatHistory + "\n\nAsistant: " + data.message;
        chatboxbody.innerHTML += `<div class="response">${data.message}</div>`;
        scrollToBottom();
      });
  }
}

function scrollToBottom() {
  chatboxbody.scrollTop = chatboxbody.scrollHeight;
}
