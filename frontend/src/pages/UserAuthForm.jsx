import InputBox from '../components/InputBox';
import googleIcon from '../assets/google.png';
import { Link } from 'react-router-dom';

const UserAuthForm = ({ type }) => {
    return (
        <section className="h-cover flex items-center justify-center">
            <form className="w-[80%] max-w-[400px]">
                <h1 className="text-4xl font-gelasio capitalize text-center mb-24">{type === 'sign-in' ? 'Welcome back' : 'Join us today'}</h1>

                {type !== 'sign-in' ? <InputBox name="fullname" type="text" placeholder="Full Name" icon="fi-rr-user" /> : ''}

                <InputBox name="email" type="email" placeholder="Email" icon="fi-rr-envelope" />

                <InputBox name="password" type="password" placeholder="Password" icon="fi fi-rr-key" />

                <button className="btn-dark center">{type.replace('-', ' ')}</button>

                <div className="flex items-center gap-2 my-10 uppercase opacity-20 text-black font-bold">
                    <hr className="w-1/2 border-black" />
                    <p>or</p>
                    <hr className="w-1/2 border-black" />
                </div>

                <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                    <img src={googleIcon} className="w-5" alt="" />
                    continue with google
                </button>

                {type === 'sign-in' ? (
                    <p className="mt-6 text-dark-gray text-xl text-center">
                        Don't have an account ?
                        <Link to="/signup" className="underline text-black text-xl">
                            Join us today.
                        </Link>
                    </p>
                ) : (
                    <p className="mt-6 text-dark-gray text-xl text-center">
                        Already a member ?
                        <Link to="/signin" className="underline text-black text-xl">
                            Sign in here.
                        </Link>
                    </p>
                )}
            </form>
        </section>
    );
};

export default UserAuthForm;
