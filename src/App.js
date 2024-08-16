import {useState} from 'react'


function App() {

  const [date,setDate] = useState('');
  const [submitedDate, setSubmitedDate] = useState('');
  const [tpY,settpY] = useState('');
  const [tpM,settpM] = useState('');
  const [tpD,settpD] = useState('');
  const [_today,setToday] = useState('');
  const [amount,setAmount] = useState('');
  const [interest,setInterest] = useState('');

  const [tAmount,setTAmount] = useState('');
  const [tInterest,setTInterest] = useState('');


  const handleDateChange = (event) =>{
    //console.log(event.target.value);
    setDate(event.target.value); // the event.target.value and value={} both are different , first event.target.value is occur when inputfield is change,
    // then react rerender the  React re-renders the component, and value={date} now reflects the new state. The input field displays the updated date.

  };

  const handleAmountChange =(event)=>{
    setAmount(event.target.value);
  }

  const handleInterestChange = (event)=>{
    setInterest(event.target.value);
  }
  const handleSubmit = (event) =>{

    event.preventDefault();
    setSubmitedDate(date);

    const arr = date.split("-");
    console.log(arr);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1; // month index start form 0
    const _date = today.getDate();
    setToday(year+"-"+month+"-"+_date);

    console.log(year+"-"+month+"-"+_date);

    let years, months, days;

     if(arr[1]==month && arr[2]==_date){

       years=year-arr[0];
       months=month-arr[1];
       days=_date-arr[2];
     }
     else if(_date<arr[2]){
       if(month>arr[1]){
         years=year-arr[0];
         months=month-arr[1]-1;
         days=(30-arr[2])+_date;
       }
       else if(month<=arr[1]){

          years=year-arr[0]-1;
          months=12-(arr[1]-month)-1;
          days=30-(arr[2]-_date);

       }
     }
     else if(_date>arr[2]){

       if(month>=arr[1]){

         years=year-arr[0];
         months=month-arr[1];
         days=_date-arr[2];
       }
       else if(month<arr[1]){
         years=year-arr[0]-1;
         months=12-(arr[1]-month);
         days=_date-arr[2];
       }
     }
     settpY(years);
     settpM(months);
     settpD(days);

     const timePeriodInMonths=((years*12)+months+(days/30));

     const totalInterest = timePeriodInMonths *((amount*interest)/100);

     setTInterest(totalInterest);
     setTAmount(parseFloat(amount)+totalInterest);

  };

  return (

      <div className="App">
        <form onSubmit={handleSubmit}>
        <h1>Interest Calculator</h1>
        <hr/>

        <table>
          <tr>
            <td>  <label htmlFor="dateInput">Select Date:</label></td>
            <td><input type ="date" id="dateInput" value={date} onChange = {handleDateChange} placeholder="Enter Date" required/></td>
          </tr><br/>
          <tr>
            <td><label htmlFor="amountInput">Enter Amount:</label></td>
            <td><input type="number" id="amountInput" value ={amount} onChange = {handleAmountChange} placeholder="Amount" required/></td>
          </tr><br/>
          <tr>
            <td><label htmlFor="interestRate">Interest(%):</label></td>
            <td><input type="number" id="interestRate" value={interest} onChange = {handleInterestChange} placeholder="interest for 100 " required/></td>
          </tr><br/>
        </table>
        <button className="btn">Calculate</button>

        </form>
        {submitedDate && (
          <>
          <table>
            <tr>
              <td><p><strong>Selected Date</strong></p></td>
              <td>:{submitedDate}</td>
            </tr>
            <tr>
              <td><p><strong>Till Date</strong></p></td>
              <td>:{_today}</td>
            </tr>
            <tr>
              <td><p><strong>Amount</strong></p></td>
              <td>:{amount}</td>
            </tr>
            <tr>
              <td><p><strong>Interest per Month (for 100)</strong></p></td>
              <td>:{interest}%</td>
            </tr>
            <tr>
              <td><p><strong>Time Period</strong></p></td>
              <td>:{tpY} years,{tpM} months,{tpD} days</td>
            </tr>
            <tr>
              <td><p><strong>Total Interest</strong></p></td>
              <td>:{tInterest}</td>
            </tr>
            <tr>
              <td><p><strong>Total (Amount+interest)</strong></p></td>
              <td>:{tAmount}</td>
            </tr>
          </table>
          <p className="cpyright"> © copy right Sathish Chinnolla</p>
          </>
        )}
      </div>
  );
}
export default App;
