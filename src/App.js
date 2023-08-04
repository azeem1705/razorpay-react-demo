import axios from 'axios'
import './App.css';

import useRazorpay from "react-razorpay";

function App() {

  const [Razorpay] = useRazorpay();

  const completeOrder = (payment_id,order_id,signature,amount) => {

    axios.post('http://localhost:8000/razorpay/order/complete/', {
      "payment_id":payment_id,
      "order_id":order_id,
      "signature":signature,
      "amount":amount,
      "user":2,
    })
    .then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error);
    })

  }


  const razorpayPayment = (amount) => {
    axios.post('http://localhost:8000/razorpay/order/create/', {
      amount: amount,
      currency: 'INR'
    })
    .then(function (response) {
      const order_id = response.data.data.id

      const options = {
        key: "rzp_test_uMUeQ0bCXQCQN1", // Enter the Key ID generated from the Dashboard

        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: function (response) {
          completeOrder(response.razorpay_payment_id,response.razorpay_order_id,response.razorpay_signature,amount)
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
    
      const rzp1 = new Razorpay(options);
    
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
    
      rzp1.open();


    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="App">
       <div className="plans">
    <div className="plan">
      <h2 className="plan-title">Solo</h2>
      <p className="plan-price"> ₹ 1900</p>
      <ul className="plan-features">
        <li><strong>1</strong> user</li>
        <li><strong>Unlimited</strong> projects</li>
        <li><strong>2GB</strong> storage</li>
      </ul>
      <button type="submit" onClick={() => razorpayPayment(1900)} className="plan-button">Start Now</button>
    </div>
    <div className="plan plan-tall">
      <h2 className="plan-title">Team</h2>
      <p className="plan-price"> ₹ 4900</p>
      <ul className="plan-features">
        <li><strong>10</strong> users</li>
        <li><strong>Unlimited</strong> projects</li>
        <li><strong>20GB</strong> storage</li>
      </ul>
      <button type="submit" onClick={() => razorpayPayment(4900)} className="plan-button">Start Now</button>
    </div>
    <div className="plan">
      <h2 className="plan-title">Agency</h2>
      <p className="plan-price"> ₹ 9900</p>
      <ul className="plan-features">
        <li><strong>Unlimited</strong> users</li>
        <li><strong>Unlimited</strong> projects</li>
        <li><strong>100GB</strong> storage</li>
      </ul>
      <button type="submit" onClick={() => razorpayPayment(9900)} className="plan-button">Start Now</button>
    </div>
  </div>
  <div className="about">
    <p className="about-links">
      <a href="http://www.agilewebsitedev.com" target="_blank" title="WordPress developer with strong skills in HTML and CSS">Agile Website Dev</a>
      <a href="http://www.agileseo.net" target="_blank" title="SEO training in Chandigarh, Mohali and Panchkula">Agile SEO</a>
    </p>
    <p className="about-author">
      © 2013 <a href="https://palimadra.tumblr.com" target="_blank">Pali Madra</a> -
      <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a><br />
    </p>
  </div>
    </div>
  );
}

export default App;
