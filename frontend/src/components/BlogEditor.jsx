import { Link } from 'react-router-dom';
import logo from '../assets/feather.png';
import AnimationWrapper from '../common/AnimationWrapper';
import defaultBanner from '../assets/blog banner.png';

const BlogEditor = () => {
    const handleBannerUpload = (e) => {
        let img = e.target.files[0];
        console.log(img);
    };

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

            <AnimationWrapper>
                <section>
                    <div className="mx-auto max-w-[900px] w-full">
                        <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-gray">
                            <label htmlFor="uploadBanner" className="cursor-pointer">
                                <img src={defaultBanner} alt="" />
                                <input id="uploadBanner" type="file" accept=".png, .jpg, .jpeg" hidden onChange={handleBannerUpload} />
                            </label>
                        </div>
                    </div>
                </section>
            </AnimationWrapper>
        </>
    );
};

export default BlogEditor;
