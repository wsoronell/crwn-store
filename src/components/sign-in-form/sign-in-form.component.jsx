import {useState, useEffect} from 'react';
import { 
    auth,
    createUserDocFromAuth, 
    signInWithGoogleRedirect,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email:'',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    useEffect(() => {
        async function fetchResult(){
            try{
                const result = await getRedirectResult(auth);
                console.log(result);
            } catch(error){
                console.log(error);
            }
        }
        fetchResult();
    }, [])

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (error) {
            switch (error.code){
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default: 
                    alert('error signing in, please try again');
            }
        }
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
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

               <div className="buttons-container">
                <Button type="submit">Sign in</Button>
                <Button type="button" buttonType='google' onClick={signInWithGoogleRedirect}>Google sign in</Button>
               </div>
            </form>
        </div>
    )
};

export default SignInForm;