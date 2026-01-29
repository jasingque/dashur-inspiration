
import { useParams } from 'react-router-dom'

export default function Applyform() {
    const { id } = useParams()
    console.log(id);
    return (
        <div className='text-white py-24'>

            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200">
                {/* <!-- Header --> */}
                <div className="px-8 py-6 border-b border-slate-200">
                    <h1 className="text-2xl font-semibold text-slate-800">Job Application</h1>
                    <p className="text-sm text-slate-500 mt-1">Please fill out the form carefully. All fields are required.</p>
                </div>


                {/* <!-- Form --> */}
                <form className="px-8 py-6 space-y-6">


                    {/* <!-- Personal Info --> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                            <input type="text" placeholder="John"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-700 focus:border-slate-900 focus:ring-2 focus:ring-slate-200 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                            <input type="text" placeholder="Doe"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-700 focus:border-slate-900 focus:ring-2 focus:ring-slate-200 outline-none" />
                        </div>
                    </div>


                    {/* <!-- Contact --> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input type="email" placeholder="john@example.com"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-700 focus:border-slate-900 focus:ring-2 focus:ring-slate-200 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input type="tel" placeholder="+880 1XXXXXXXXX"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-700 focus:border-slate-900 focus:ring-2 focus:ring-slate-200 outline-none" />
                        </div>
                    </div>


                    {/* <!-- Position --> */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Position Applied For</label>
                        <select
                            name="position"
                            value={id}
                           
                            disabled
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-700 focus:border-slate-900 focus:ring-2 focus:ring-slate-200 outline-none">
                            <option value="">Select a position</option>
                            <option value="frontend">Frontend Developer</option>
                            <option value="backend">Backend Developer</option>
                            <option value="fullstack">Full Stack Developer</option>
                            <option value="uiux">UI/UX Designer</option>
                            <option value="qa">QA Engineer</option>
                            <option value="devops">DevOps Engineer</option>
                            <option value="mobile">Mobile Developer</option>
                        </select>
                    </div>


                    {/* <!-- Resume --> */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Upload Resume</label>
                        <input type="file"
                            className="w-full rounded-lg border border-dashed border-slate-300 px-4 py-3 text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white hover:file:bg-slate-800" />
                    </div>


                    {/* <!-- Cover Letter --> */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Cover Letter</label>
                    </div>
                    </form>
            </div>
        </div>
    )
}