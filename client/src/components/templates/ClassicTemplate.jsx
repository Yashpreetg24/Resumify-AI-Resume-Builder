import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        if (dateStr.includes(' ') || isNaN(dateStr.split('-')[0])) return dateStr;
        const [year, month] = dateStr.split("-");
        const date = new Date(year, (month || 1) - 1);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    return (
        <div className="bg-white text-slate-800 min-h-[11in] font-sans p-16 selection:bg-indigo-100 leading-relaxed">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-4xl font-black font-heading text-primary tracking-tighter leading-none uppercase mb-4">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-sm font-black text-accent uppercase tracking-[0.4em] mb-6 opacity-60">
                    {data.personal_info?.profession || "Designation"}
                </p>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] font-black uppercase tracking-widest text-secondary/60">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={12} className="text-primary opacity-30" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={12} className="text-primary opacity-30" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={12} className="text-primary opacity-30" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-2">
                            <Linkedin size={12} className="text-primary opacity-30" />
                            <span>LinkedIn</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="space-y-12">
                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="space-y-4">
                        <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.5em] border-b border-slate-100 pb-2 text-center">
                            // PROFILE_SYNTHESIS
                        </h2>
                        <p className="text-[13px] font-medium leading-relaxed text-secondary/80 text-center max-w-3xl mx-auto">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="space-y-8">
                        <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.5em] border-b border-slate-100 pb-2 text-center">
                            // EXPERIENCE_MATRIX
                        </h2>

                        <div className="space-y-10">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="grid grid-cols-12 gap-8">
                                    <div className="col-span-3 text-right">
                                        <div className="text-[10px] font-black text-secondary/40 uppercase tracking-widest pt-1">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
                                        </div>
                                    </div>
                                    <div className="col-span-9 space-y-2">
                                        <h3 className="text-lg font-black text-primary tracking-tight uppercase">
                                            {exp.position}
                                        </h3>
                                        <p className="text-xs font-bold text-accent uppercase tracking-widest">
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <div className="text-[13px] font-medium leading-relaxed text-secondary/70 whitespace-pre-line pt-2">
                                                {exp.description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education & Skills Grid */}
                <div className="grid grid-cols-2 gap-16 pt-4">
                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.5em] border-b border-slate-100 pb-2">
                                // ACADEMICS
                            </h2>
                            <div className="space-y-6">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="space-y-1">
                                        <h3 className="text-xs font-black text-primary uppercase tracking-wider">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-[11px] font-bold text-accent uppercase tracking-widest">
                                            {edu.institution}
                                        </p>
                                        <div className="text-[9px] font-black text-secondary/40 uppercase tracking-widest pt-1">
                                            {formatDate(edu.graduation_date)} {edu.gpa && `• GPA: ${edu.gpa}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.5em] border-b border-slate-100 pb-2">
                                // EXPERTISE
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="text-[10px] font-black text-secondary/80 uppercase tracking-widest px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <section className="space-y-6">
                        <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.5em] border-b border-slate-100 pb-2 text-center">
                            // NOTABLE_PROJECTS
                        </h2>
                        <div className="grid grid-cols-2 gap-8">
                            {data.project.map((proj, index) => (
                                <div key={index} className="space-y-2 p-6 bg-slate-50/50 border border-slate-50 rounded-2xl">
                                    <h3 className="text-xs font-black text-primary uppercase tracking-widest">{proj.name}</h3>
                                    <p className="text-[12px] font-medium text-secondary/70 leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-slate-50">
                <div className="flex justify-between items-center text-[8px] font-black text-secondary/20 uppercase tracking-[0.4em]">
                    <span>Official Document // System_Ref: {data._id?.slice(-6).toUpperCase() || "BETA"}</span>
                    <span>Produced by Resumify Intelligence</span>
                </div>
            </footer>
        </div>
    );
}

export default ClassicTemplate;