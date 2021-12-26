import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { userContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const onSubmit = data => {
    console.log(data)
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

      <input defaultValue={loggedInUser.name} placeholder='Type Your Name' {...register("name", { required: true })} />
      {errors.name && <span className='error'>Name is required</span>}

      <input defaultValue={loggedInUser.email} placeholder='Type Your Email' {...register("email", { required: true })} />
      {errors.email && <span className='error'>Email is required</span>}

      <input placeholder='Type Your Phone' {...register("phone", { required: true })} />
      {errors.phone && <span className='error'>Phone is required</span>}

      <input placeholder='Type Your Address' {...register("address", { required: true })} />
      {errors.address && <span className='error'>Address is required</span>}
      
      <input type="submit" value="submit" />
    </form>
  );
};

export default Shipment;