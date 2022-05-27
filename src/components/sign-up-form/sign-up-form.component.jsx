import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';
import { signUpStart } from '../../store/user/user.action';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email:'',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            alert('passwords do not match');
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/email-already-in-use':
                    alert('Cannot create user, email already in use');
                    break;
                default:
                    alert('Error creating user, please try again');
            }
        }

    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    label="Display Name" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    value={displayName} 
                    name="displayName"
                />

                
                <FormInput 
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    value={email} 
                    name="email"
                />

            
                <FormInput 
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    value={password} 
                    name="password"
                />

        
                <FormInput 
                    label="Confirm Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    value={confirmPassword} 
                    name="confirmPassword"
                />

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
};

export default SignUpForm;