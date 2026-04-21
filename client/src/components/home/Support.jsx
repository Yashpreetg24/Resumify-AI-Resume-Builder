import React, { useState } from 'react';
import { MessageSquare, Send, ThumbsUp, AlertCircle, HelpCircle } from 'lucide-react';
import Title from './Title';
import toast from 'react-hot-toast';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'feedback',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd send this to your backend
        toast.success('Thank you! Your feedback has been received.');
        setFormData({ name: '', email: '', type: 'feedback', message: '' });
    };

    return (
        <section id="support" className="py-24 px-6 md:px-16 lg:px-24 xl:px-40 bg-white">
            <div className="flex flex-col items-center mb-16 text-center">

                <Title 
                    title="We'd Love to Hear From You" 
                    description="Have a suggestion, a complaint, or just want to share your experience? Your feedback helps us build a better Resumify."
                />
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-12 gap-8 items-start">
                {/* Info Side */}
                <div className="md:col-span-4 space-y-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="size-9 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                            <ThumbsUp className="text-green-600 size-4.5" />
                        </div>
                        <h3 className="text-base font-semibold text-slate-800 mb-1">Share a Review</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">Loved using Resumify? Share your success story with us and help others land their dream jobs.</p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="size-9 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                            <MessageSquare className="text-blue-600 size-4.5" />
                        </div>
                        <h3 className="text-base font-semibold text-slate-800 mb-1">General Opinions</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">Have an idea for a new feature? We're always looking for ways to innovate and improve.</p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="size-9 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                            <AlertCircle className="text-red-600 size-4.5" />
                        </div>
                        <h3 className="text-base font-semibold text-slate-800 mb-1">Report an Issue</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">Facing a technical glitch or have a complaint? Our team is here to help you resolve it.</p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="md:col-span-8 bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xl shadow-slate-200/40">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Your Name"
                                    required
                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all text-slate-800"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                                <input 
                                    type="email" 
                                    placeholder="Your Email"
                                    required
                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all text-slate-800"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Feedback Type</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Review', 'Opinion', 'Complaint'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData({...formData, type: type.toLowerCase()})}
                                        className={`h-11 rounded-xl text-xs font-bold transition-all border ${
                                            formData.type === type.toLowerCase() 
                                            ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-100' 
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-green-200 hover:bg-green-50/50'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Your Message</label>
                            <textarea 
                                placeholder="Tell us more about it..."
                                required
                                rows={4}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all resize-none text-slate-800"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full h-14 bg-green-600 text-white rounded-2xl font-bold text-base flex items-center justify-center gap-3 hover:bg-green-700 active:scale-[0.98] transition-all shadow-xl shadow-green-100 mt-2 group"
                        >
                            Submit Feedback
                            <Send className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default Support;
