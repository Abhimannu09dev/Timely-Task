import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import styles from '../CSS/SignIn.module.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


interface FormErrors{
    email?: string,
    password?: string,
};

function SignIn(){

    // default state for form data
    const [formData,setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword,setShowPassword] = useState(false);

    //Function to handle the changes in the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name ,value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]:value
        }));
    };

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    //Creation of function to validate form
    const validateForm = () =>{
        const newErrors:FormErrors = {};
        if (!formData.email.trim()){
            newErrors.email = "Please enter valid email";
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
            newErrors.email = "Please enter valid email";
        }

        if (!formData.password){
            newErrors.password = "Password is required";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length ===0;
    };

    const navigate = useNavigate();
    //Function to handle to form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            try{
                console.log("Form is valid!");
                await axios.post("http://localhost:3000/users/login", formData).then((response) =>{
                console.log("User Logined Successfully");
                localStorage.setItem('userName', response.data.user.name); /*Stores the userName in the local Storage 
                                                                            which can be later accessed */
                    setFormData({
                        email: "",
                        password: "",
                    });
                    setErrors({});
                
                navigate("/HomePage", {replace: true});

                });
            }catch (error: any){
                console.error("Error Signing in user");
                alert('Error signing in');
            }finally{
                setIsLoading(false);
            }
        }
        
    };

    
    return (
        <>
        <div className={styles.container}>
            <div className={styles.content}>
                <div>
                    <h1 className={styles.heading}>Welcome back</h1>
                    <p className={styles.desc}>Sign in to organize your tasks</p>
                </div>
                {/* Input form */}
                <form className={styles.formField} onSubmit={handleSubmit}>
                    <div className={styles.inputField}>
                        <MdOutlineMailOutline />
                        <input  type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Email Address"
                                onChange={handleChange}/>
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>
                    <div className={styles.inputField}>
                        <MdOutlineLock />
                         <input  type={showPassword ? "text": "password"} 
                                name="password"
                                value={formData.password}
                                placeholder="Password"
                                onChange={handleChange}/>
                        <span className={styles.toggleIcon}
                                onClick={() => {setShowPassword(!showPassword)}}>
                                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </span>
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>
                    <button type="submit" className={styles.button} disabled={isLoading}>Sign In</button>
                </form>
                <p className={styles.desc}> Don't have an account? <Link to="/Signup">Sign Up</Link></p>
            </div>
        </div>
        </>
    );

}
export default SignIn;