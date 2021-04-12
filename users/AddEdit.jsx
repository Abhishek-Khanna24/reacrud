import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ReactDatePicker from "react-datepicker";
import { userService, alertService } from '../_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        order_id: Yup.string()
            .required('order_id is required'),
        customer_id: Yup.string()
            .required('customer_id is required'),
        order_date: Yup.string()
            .required('order_date is required'),
        shipping_date: Yup.string()
            .required('shipping_date is required'),
        product_id: Yup.string()
            .required('product_id is required'),
        product_category: Yup.string()
            .required('product_category is required'),
        name: Yup.string()
            .required('name is required'),
        street_address: Yup.string()
            .required('street_address is required'),
        city: Yup.string()
            .required('city is required'),
        state: Yup.string()
            .required('state is required'),
        postal_code: Yup.string()
            .required('postal_code is required'),
        country: Yup.string()
            .required('country is required'),
        data_collected: Yup.string()
            .required('Role is required'),        
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, getValues, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    }

    function createUser(data) {
        return userService.create(data)
            .then(() => {
                alertService.success('User added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('User updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id).then(user => {
                const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
                fields.forEach(field => setValue(field, user[field]));
                setUser(user);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add order' : 'Edit Order'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>street_address</label>
                    <input name="street_address" type="text" ref={register} className={`form-control ${errors.street_address ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.street_address?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>city</label>
                    <input name="city" type="text" ref={register} className={`form-control ${errors.street_address ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.city?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>state</label>
                    <input name="state" type="text" ref={register} className={`form-control ${errors.street_address ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.state?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>postal_code</label>
                    <input name="postal_code" type="text" ref={register} className={`form-control ${errors.street_address ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.postal_code?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>country</label>
                    <input name="country" type="text" ref={register} className={`form-control ${errors.country ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.country?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>year_of_birth</label>
                    <input name="year_of_birth" type="text" ref={register} className={`form-control ${errors.street_address ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.year_of_birth?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>description</label>
                    <input name="description" type="text" ref={register} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
                <div className="form-group col">
                    <label>company Name</label>
                    <select name="data_collected" ref={register} className={`form-control ${errors.data_collected ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="ACME">ACME</option>
                        <option value="MAXO">MAXO</option>
                    </select>
                    <div className="invalid-feedback">{errors.data_collected?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>customer_id</label>
                    <input name="customer_id" type="text" ref={register} className={`form-control ${errors.customer_id ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.customer_id?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>order_date</label>
                    <input name="order_date" type="text" ref={register} className={`form-control ${errors.order_date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.order_date?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>shipping_date</label>
                    <input name="shipping_date" type="text" ref={register} className={`form-control ${errors.shipping_date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.shipping_date?.message}</div>
                </div>
                <div className="form-group col-7">
                    <label>product_id</label>
                    <input name="product_id" type="text" ref={register} className={`form-control ${errors.product_id ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.product_id?.message}</div>
                </div>
                
            </div>
            <div className="form-row">
              <div className="form-group col-5">
                    <label>product_category</label>
                    <input name="product_category" type="text" ref={register} className={`form-control ${errors.product_category ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.product_category?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>name</label>
                    <input name="name" type="text" ref={register} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>gender</label>
                    <input name="gender" type="text" ref={register} className={`form-control ${errors.gender ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.gender?.message}</div>
                </div>
            </div>
            
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };