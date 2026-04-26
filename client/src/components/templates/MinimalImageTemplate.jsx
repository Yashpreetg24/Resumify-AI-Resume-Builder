import { Mail, Phone, MapPin, Linkedin, Globe, Github, ExternalLink, ArrowUpRight } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        // If it's already a formatted string (like "May 2024"), just return it
        if (dateStr.includes(' ') || isNaN(dateStr.split('-')[0])) return dateStr;

        const [year, month] = dateStr.split("-");
        const date = new Date(year, (month || 1) - 1);

        if (isNaN(date.getTime())) return dateStr; // Fallback to original string

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="bg-white text-zinc-800 min-h-[297mm] w-full font-sans selection:bg-indigo-100 leading-relaxed shadow-none">
            <div className="grid grid-cols-3">

                <div className="col-span-1  py-10">
                    {/* Image */}
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <div className="mb-6">
                            <img src={data.personal_info.image} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" style={{ background: accentColor+'70' }} />
                        </div>
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <div className="mb-6">
                                <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" />
                            </div>
                        ) : null
                    )}
                </div>

                {/* Name + Title */}
                <div className="col-span-2 flex flex-col justify-center py-8 px-6">
                    <h1 className="text-3xl font-bold text-zinc-700 tracking-widest">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="uppercase text-zinc-600 font-medium text-xs tracking-widest mt-1">
                        {data?.personal_info?.profession || "Profession"}
                    </p>
                </div>

                {/* Left Sidebar */}
                <aside className="col-span-1 border-r border-zinc-300 p-4 pt-0">


                    {/* Contact */}
                    <section className="mb-6">
                        <h2 className="text-[10px] font-semibold tracking-widest text-zinc-600 mb-2">
                            CONTACT
                        </h2>
                        <div className="space-y-1.5 text-[11px]">
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={12} style={{ color: accentColor }} />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-2">
                                     <Mail size={12} style={{ color: accentColor }} />
                                    <span className="break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={12} style={{ color: accentColor }} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                            {data.personal_info?.linkedin && (
                                 <a href={data.personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                     <Linkedin size={12} style={{ color: accentColor }} />
                                     <span>LinkedIn</span>
                                 </a>
                             )}
                             {data.personal_info?.website && (
                                 <a href={data.personal_info.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                     <Globe size={12} style={{ color: accentColor }} />
                                     <span>Portfolio</span>
                                 </a>
                             )}
                        </div>
                    </section>

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-[10px] font-semibold tracking-widest text-zinc-600 mb-2">
                                EDUCATION
                            </h2>
                            <div className="space-y-3 text-[11px]">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-semibold uppercase leading-tight">{edu.degree}</p>
                                        <p className="text-zinc-600 leading-tight mt-0.5">{edu.institution}</p>
                                        <p className="text-[9px] text-zinc-500 mt-1 uppercase tracking-wider">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-semibold tracking-widest text-zinc-600 mb-2">
                                SKILLS
                            </h2>
                            <ul className="space-y-1 text-[11px]">
                                {data.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>

                {/* Right Content */}
                <main className="col-span-2 p-6 pt-0">

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-6">
                            <h2 className="text-[10px] font-semibold tracking-widest mb-2" style={{ color: accentColor }} >
                                SUMMARY
                            </h2>
                            <p className="text-[12px] text-zinc-700 leading-relaxed">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-semibold tracking-widest mb-4" style={{ color: accentColor }} >
                                EXPERIENCE
                            </h2>
                            <div className="space-y-6 mb-8">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold text-zinc-900">
                                                {exp.position}
                                            </h3>
                                            <span className="text-xs text-zinc-500">
                                                {formatDate(exp.start_date)} -{" "}
                                                {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-sm mb-2" style={{ color: accentColor }} >
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <ul className="list-disc list-inside text-sm text-zinc-700 leading-relaxed space-y-1">
                                                {exp.description.split("\n").map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <h2 className="text-sm uppercase tracking-widest font-semibold" style={{ color: accentColor }}>
                                PROJECTS
                            </h2>
                            <div className="space-y-4">
                                {data.project.map((project, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center mt-3">
                                            <h3 className="text-md font-medium text-zinc-800">{project.name}</h3>
                                            <div className="flex gap-4 text-[10px] font-semibold uppercase tracking-wider">
                                                {project.codebase_url && (
                                                    <a href={project.codebase_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 hover:opacity-70 transition-opacity">
                                                        <span>Codebase</span>
                                                        <ArrowUpRight size={12} style={{ color: accentColor }} />
                                                    </a>
                                                )}
                                                {project.hosted_url && (
                                                    <a href={project.hosted_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 hover:opacity-70 transition-opacity">
                                                        <span>Hosted</span>
                                                        <ArrowUpRight size={12} style={{ color: accentColor }} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm mb-1" style={{ color: accentColor }} >
                                            {project.type}
                                        </p>
                                        {project.description && (
                                            <ul className="list-disc list-inside text-sm text-zinc-700  space-y-1">
                                                {project.description.split("\n").map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}


export default MinimalImageTemplate;