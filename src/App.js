import axios from "axios";
import { useForm } from "react-hook-form"; 
import './App.css';
function App() {
  const {handleSubmit,register,formState:{errors}}=useForm();
  const onFormSubmit=(userObj)=>{
    axios.post("http://localhost:4000/form-api/add-data",userObj)
    .then((response)=>{
        alert(response.data.message)
    })
    .catch((err)=>{
        alert("Error occurred",err);
    })
  }
  return (
    <div className="container a mt-5">
      <div className="card b mt-3">
        <img src="https://img.freepik.com/free-vector/woman-setting-her-dates-appointment-booking_23-2148552955.jpg"/>
      </div>
    <div className="container card mt-3">
      <div className="card-body mt-5">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h1 className="text-center c">Appointment form</h1>
        <div>
          <label for="name" className="r">Name</label>
          <input type="text" id="name" className="form-control" {...register("name",{required:true})}/>
          {errors.name?.type=='required'&&<p className="text-danger">*name is required</p>}
        </div>
        <div className="mt-3">
          <label for="m_num" className="r">Mobile no.</label>
          <input type="number" id="m_num" className="form-control" {...register("mobile_no",{required:true,maxLength:10,minLength:10})}/>
          {errors.mobile_no?.type=='required'&&<p className="text-danger">*Mobile number is required</p>}
          {errors.mobile_no?.type=='maxLength'&&<p className="text-danger">*length of mobile number must be ten</p>}
          {errors.mobile_no?.type=='minLength'&&<p className="text-danger">*length of number must be ten</p>}
        </div>
        <div className="mt-3">
          <label for="mail" className="r">Email</label>
          <input type="email" id="mail" className="form-control"{...register("email",{required:true})}/>
          {errors.email?.type=='required'&&<p className="text-danger">*email is required</p>}
        </div>
        <div className="mt-3">
          <label for="dt" className="r">Select date</label>
          <input type="date" id="dt" className="form-control" {...register("date",{required:true})}/>
          {errors.date?.type=='required'&&<p className="text-danger">*date is required</p>}
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      </div>
    </div>
    </div>
  );
}

export default App;
