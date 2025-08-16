import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { useState } from "react";
import styles  from '../CSS/Signup.module.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

interface FormErrors{
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
};

function Signup(){

    // Creation of default form State 
    const [formData, setFormData] = useState({
        name : '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Creation of fuction to handle changes in the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]:value
        }));
    };

    // Creaton of default state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //Creation of form validation
    const [errors, setErrors] = useState<FormErrors>({});// Error State with FormErros interface
    const validateForm = () =>{
        const newErrors: any = {};

        if(!formData.name.trim()){
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()){
            newErrors.email = "Please enter valid email";
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
            newErrors.email = "Please enter valid email";
        }

        if (!formData.password){
            newErrors.password = "Password is required";
        }else if(formData.password.length < 6){
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword){
            newErrors.confirmPassword = "Password is required";
        }else if(formData.password != formData.confirmPassword){
            newErrors.confirmPassword = "Password is mismatched";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length ===0;
    }

    const navigate = useNavigate();
    // Function to handle the submit 
    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault(); // Prevent the default behaviour of the submit button
        setIsLoading(true);
        
        if (validateForm()){
            try{
                document.body.style.cursor = "wait"; //Set cursor to loading state
                console.log("Form is valid!", formData);
                await axios.post("http://localhost:3000/users/create", formData).then(() =>{
                console.log("User Registered Successfully");
                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword:"",
                    });
                    setErrors({});
                    toast.success('User created', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                    navigate("/");
                });
            
            }catch (error: any){
                if(error.response.status === 409){
                    toast.error('User already created', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }else{
                    console.error("Error registering user");
                    toast.error('Error Registering User', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            }finally{
                document.body.style.cursor = "default"; //Set cursor to default state
                setIsLoading(false);
            }
            
        }else{
            console.log("Form has errors");
        }
    }
    return(
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div>
                        <h1 className={styles.heading}>Create Account</h1>
                        <p className={styles.desc}>Join us to organize your life better</p>
                    </div>
                    {/* Input form */}
                    <form className={styles.formField} onSubmit={handleSubmit}>

                        <div className={styles.inputField}>
                            <FaRegUser />
                            <input  type="text" 
                                    name="name" 
                                    placeholder="Full Name" 
                                    value={formData.name}
                                    onChange={handleChange}/>
                        </div>
                        {errors.name && <p className="error">{errors.name}</p>}

                        <div className={styles.inputField}>
                            <MdOutlineMailOutline />
                            <input  type="email"
                                    name="email" 
                                    placeholder="Email Address" 
                                    value={formData.email}
                                    onChange={handleChange}/>
                        </div>
                        {errors.email && <p className={styles.error}>{errors.email}</p>}

                        <div className={styles.inputField}>
                            <MdOutlineLock />
                            <input  type={showPassword ? "text" : "password"}
                                    name="password" 
                                    placeholder="Password"
                                    value={formData.password} 
                                    onChange={handleChange}/>
                            <span className={styles.toggleIcon} 
                                    onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                            </span>
                        </div>
                        {errors.password && <p className={styles.error}>{errors.password}</p>}

                        <div className={styles.inputField}>
                            <MdOutlineLock />
                            <input  type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword" 
                                    placeholder="Confirm Password" 
                                    value={formData.confirmPassword}
                                    onChange={handleChange}/>
                            <span className={styles.toggleIcon}
                                    onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <MdVisibilityOff /> :<MdVisibility />}
                            </span>
                        </div>
                        {errors.password && <p className={styles.error}>{errors.confirmPassword}</p>}
                        <button type="submit" className={styles.button} disabled={isLoading}>{isLoading ? "Creating..." :"Create Account"}</button>
                    </form>
                    <p className={styles.desc}> Already have an account? <Link to="/">Sign In</Link></p>
                </div>
            </div>
        </>
    )
}
export default Signup;