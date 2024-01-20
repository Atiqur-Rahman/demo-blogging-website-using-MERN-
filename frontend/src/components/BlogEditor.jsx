import { Link } from 'react-router-dom';
import logo from '../assets/owl.jpg';
import AnimationWrapper from '../common/AnimationWrapper';
import defaultBanner from '../assets/blog banner.png';
import { uploadImage } from '../common/AWS';
import { Toaster, toast } from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { EditorContext } from '../pages/Editor';
import EditorJs from '@editorjs/editorjs';
import { tools } from './Tools';

const BlogEditor = () => {
    let {
        blog,
        blog: { title, banner, content, tags, des, author },
        setBlog,
        textEditor,
        setTextEditor,
        setEditorState,
    } = useContext(EditorContext);

    // useEffect
    useEffect(() => {
        setTextEditor(
            new EditorJs({
                holder: 'textEditor',
                data: content,
                tools: tools,
                placeholder: "Let's write an awesome story",
            })
        );
    }, [setTextEditor, content]);

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];

        if (img) {
            let loadingToast = toast.loading('Uploading...');
            uploadImage(img)
                .then((url) => {
                    if (url) {
                        toast.dismiss(loadingToast);
                        toast.success('Uploaded ');

                        setBlog({ ...blog, banner: url });
                    }
                })
                .catch((err) => {
                    toast.dismiss(loadingToast);
                    return toast.error(err);
                });
        }
    };

    const handleTitleKeydown = (e) => {
        if (e.keyCode === 13) {
            // Enter key
            e.preventDefault();
        }
    };

    const handleTitleChange = (e) => {
        let input = e.target;

        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';

        setBlog({ ...blog, title: input.value });
    };

    const handleError = (e) => {
        let img = e.target;
        img.src = defaultBanner;
    };

    const handlePublishEvent = () => {
        // if (!banner.length) {
        //     toast.error('Upload a blog banner to publish it');
        // }

        // if (!title.length) {
        //     toast.error('Write blog title to publish it');
        // }

        if (textEditor.isReady) {
            textEditor
                .save()
                .then((data) => {
                    // if (data.blocks.length) {
                    setBlog({ ...blog, content: data });
                    setEditorState('publish');
                    // } else {
                    //     return toast.error('Write something in your blog to publish it');
                    // }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/">
                    <img src={logo} className="flex-none w-12" alt="" />
                </Link>

                <p className="max-md:hidden text-black line-clamp-1">{title.length ? title : 'New Blog'}</p>

                <div className="flex gap-4 ml-auto">
                    <button className="btn-dark py-2" onClick={handlePublishEvent}>
                        Publish
                    </button>
                    <button className="btn-light py-2">Save Draft</button>
                </div>
            </nav>
            <Toaster />
            <AnimationWrapper>
                <section>
                    <div className="mx-auto max-w-[900px] w-full">
                        <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-gray">
                            <label htmlFor="uploadBanner" className="cursor-pointer">
                                <img src={banner} alt="" onError={handleError} />
                                <input id="uploadBanner" type="file" accept=".png, .jpg, .jpeg" hidden onChange={handleBannerUpload} />
                            </label>
                        </div>

                        <textarea defaultValue={title} placeholder="Blog Title" className="text-4xl font-medium outline-none resize-none w-full h-20 mt-10 leading-tight placeholder:opacity-50" onKeyDown={handleTitleKeydown} onChange={handleTitleChange}></textarea>

                        <hr className="w-full my-5 opacity-20" />

                        <div id="textEditor" className="w-full font-gelasio"></div>
                    </div>
                </section>
            </AnimationWrapper>
        </>
    );
};

export default BlogEditor;
