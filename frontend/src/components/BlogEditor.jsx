import { Link } from 'react-router-dom';
import logo from '../assets/feather.png';

const BlogEditor = () => {
    return (
        <>
            <nav className="navbar">
                <Link to="/">
                    <img src={logo} className="flex-none w-14 h-12" alt="" />
                </Link>

                <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>

                <div className="flex gap-4 ml-auto">
                    <button className="btn-dark py-2">Publish</button>
                    <button className="btn-light py-2">Save Draft</button>
                </div>
            </nav>
        </>
    );
};

export default BlogEditor;
