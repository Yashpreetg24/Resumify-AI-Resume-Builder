import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const MinimalTemplate = ({ data }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        if (dateStr.includes(' ') || isNaN(dateStr.split('-')[0])) return dateStr;
        const [year, month] = dateStr.split("-");
        const date = new Date(year, (month || 1) - 1);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    return (
        <div className="bg-white text-slate-800 min-h-[11in] font-sans p-20 selection:bg-indigo-100 leading-relaxed">
            {/* Header */}
            <header className="mb-20">
                <h1 className="text-6xl font-black font-heading text-primary tracking-tighter leading-none uppercase mb-6">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <div className="flex flex-wrap gap-x-10 gap-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 border-t border-slate-100 pt-8">
                    {data.personal_info?.email && <a href={`mailto:${data.personal_info.email}`} className="hover:text-primary transition-colors">{data.personal_info.email}</a>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && <a href={data.personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>}
                    {data.personal_info?.website && <a href={data.personal_info.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Portfolio</a>}
                </div>
            </header>

            <div className="space-y-20">
                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="grid grid-cols-12 gap-8">
                        <div className="col-span-3">
                            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] pt-1">
                                // ABOUT
                            </h2>
                        </div>
                        <div className="col-span-9">
                            <p className="text-xl font-medium leading-relaxed text-secondary/80">
                                {data.professional_summary}
                            </p>
                        </div>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="grid grid-cols-12 gap-8">
                        <div className="col-span-3">
                            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] pt-1">
                                // EXPERIENCE
                            </h2>
                        </div>
                        <div className="col-span-9 space-y-16">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="space-y-4">
                                    <div className="flex justify-between items-end border-b border-slate-50 pb-4">
                                        <div>
                                            <h3 className="text-2xl font-black text-primary tracking-tight uppercase">{exp.position}</h3>
                                            <p className="text-sm font-bold text-accent uppercase tracking-widest mt-1">{exp.company}</p>
                                        </div>
                                        <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    {exp.description && (
                                        <div className="text-[14px] font-medium leading-relaxed text-secondary/70 whitespace-pre-line pt-2">
                                            {exp.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section className="grid grid-cols-12 gap-8">
                        <div className="col-span-3">
                            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] pt-1">
                                // EDUCATION
                            </h2>
                        </div>
                        <div className="col-span-9 space-y-10">
                            {data.education.map((edu, index) => (
                                <div key={index} className="flex justify-between items-start group">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-black text-primary uppercase tracking-tight">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-xs font-bold text-accent uppercase tracking-widest">{edu.institution}</p>
                                        {edu.gpa && <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest pt-1">GPA: {edu.gpa}</p>}
                                    </div>
                                    <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest pt-1">
                                        {formatDate(edu.graduation_date)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <section className="grid grid-cols-12 gap-8">
                        <div className="col-span-3">
                            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] pt-1">
                                // CAPABILITIES
                            </h2>
                        </div>
                        <div className="col-span-9">
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="text-sm font-black text-primary uppercase tracking-wider">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default MinimalTemplate;