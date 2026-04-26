import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github, ArrowUpRight } from "lucide-react";

const ModernTemplate = ({ data, accentColor = "#6366f1" }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		if (dateStr.includes(' ') || isNaN(dateStr.split('-')[0])) return dateStr;
		const [year, month] = dateStr.split("-");
		const date = new Date(year, (month || 1) - 1);
		if (isNaN(date.getTime())) return dateStr;
		return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
	};

	const accentStyle = { color: accentColor };
	const accentBgStyle = { backgroundColor: accentColor };

	return (
		<div className="bg-white text-slate-800 min-h-[297mm] w-full font-sans selection:bg-indigo-100 p-0 m-0 leading-relaxed">
			{/* Header Section */}
			<header className="p-12 border-b border-slate-100 bg-slate-50/20">
				<div className="flex flex-col md:flex-row justify-between items-start gap-8">
					<div className="space-y-4 max-w-xl">
						<h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-[0.9] uppercase">
							{data.personal_info?.full_name || "Your Name"}
						</h1>
						<div className="h-1.5 w-20 rounded-full" style={accentBgStyle}></div>
						<p className="text-xl font-bold tracking-widest uppercase opacity-80" style={accentStyle}>
							{data.personal_info?.profession || "Creative Director"}
						</p>
					</div>

					<div className="grid grid-cols-1 gap-y-3 text-[10px] font-bold tracking-wider text-slate-500/90">
						{data.personal_info?.email && (
							<a 
								href={`mailto:${data.personal_info.email}`}
								className="flex items-center gap-3 hover:text-slate-900 transition-colors group/link"
							>
								<div className="size-7 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover/link:border-accent/30 transition-all">
									<Mail size={12} strokeWidth={1.5} style={accentStyle} />
								</div>
								<span className="text-slate-600 font-medium lowercase tracking-normal text-[12px]">{data.personal_info.email}</span>
							</a>
						)}
						{data.personal_info?.phone && (
							<div className="flex items-center gap-3 group/item">
								<div className="size-7 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center">
									<Phone size={12} strokeWidth={1.5} style={accentStyle} />
								</div>
								<span className="text-slate-600 font-medium text-[12px]">{data.personal_info.phone}</span>
							</div>
						)}
						{data.personal_info?.location && (
							<div className="flex items-center gap-3 group/item">
								<div className="size-7 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center">
									<MapPin size={12} strokeWidth={1.5} style={accentStyle} />
								</div>
								<span className="text-slate-600 font-medium uppercase tracking-widest text-[10px]">{data.personal_info.location}</span>
							</div>
						)}
						{data.personal_info?.linkedin && (
							<a 
								href={data.personal_info.linkedin} 
								target="_blank" 
								rel="noopener noreferrer"
								className="flex items-center gap-3 hover:text-slate-900 transition-colors group/link"
							>
								<div className="size-7 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover/link:border-accent/30 transition-all">
									<Linkedin size={12} strokeWidth={1.5} style={accentStyle} />
								</div>
								<span className="text-slate-600 font-medium tracking-normal text-[12px]">LinkedIn</span>
							</a>
						)}
						{data.personal_info?.website && (
							<a 
								href={data.personal_info.website} 
								target="_blank" 
								rel="noopener noreferrer"
								className="flex items-center gap-3 hover:text-slate-900 transition-colors group/link"
							>
								<div className="size-7 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover/link:border-accent/30 transition-all">
									<Globe size={12} strokeWidth={1.5} style={accentStyle} />
								</div>
								<span className="text-slate-600 font-medium tracking-normal text-[12px]">Portfolio</span>
							</a>
						)}
					</div>
				</div>
			</header>

			<div className="p-12 grid grid-cols-12 gap-10">
				{/* Left Sidebar (Narrow) */}
				<div className="col-span-4 space-y-12">
					{/* Professional Summary */}
					{data.professional_summary && (
						<section className="space-y-4">
							<div className="flex items-center gap-3">
								<h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] whitespace-nowrap">
									Profile
								</h2>
								<div className="h-[1px] flex-1 bg-slate-200"></div>
							</div>
							<p className="text-[12.5px] font-medium leading-relaxed text-slate-600/90">
								{data.professional_summary}
							</p>
						</section>
					)}

					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section className="space-y-6">
							<div className="flex items-center gap-3">
								<h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] whitespace-nowrap">
									Education
								</h2>
								<div className="h-[1px] flex-1 bg-slate-200"></div>
							</div>
							<div className="space-y-8">
								{data.education.map((edu, index) => (
									<div key={index} className="space-y-2">
										<h3 className="text-sm font-black text-slate-900 leading-tight">
											{edu.degree}
										</h3>
										<p className="text-[10px] font-bold uppercase tracking-widest leading-tight" style={accentStyle}>
											{edu.institution}
										</p>
										<div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest pt-1">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && (
												<span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">
													GPA: {edu.gpa}
												</span>
											)}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section className="space-y-6">
							<div className="flex items-center gap-3">
								<h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] whitespace-nowrap">
									Expertise
								</h2>
								<div className="h-[1px] flex-1 bg-slate-200"></div>
							</div>
							<div className="flex flex-wrap gap-2">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[9px] font-black text-slate-700 uppercase tracking-widest"
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}
				</div>

				{/* Right Column (Wide) */}
				<div className="col-span-8 space-y-16">
					{/* Experience */}
					{data.experience && data.experience.length > 0 && (
						<section className="space-y-8">
							<div className="flex items-center gap-3">
								<h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] whitespace-nowrap">
									Experience
								</h2>
								<div className="h-[1px] flex-1 bg-slate-200"></div>
							</div>

							<div className="space-y-10">
								{data.experience.map((exp, index) => (
									<div key={index} className="relative group">
										<div className="flex flex-col mb-4">
											<div className="flex justify-between items-start mb-2">
												<h3 className="text-xl font-black text-slate-900 tracking-tighter leading-none uppercase">
													{exp.position}
												</h3>
												<div className="text-[9px] font-black text-slate-400 bg-white px-3 py-1 rounded-full uppercase tracking-widest border border-slate-200 shadow-sm whitespace-nowrap ml-4">
													{formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
												</div>
											</div>
											<p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">
												{exp.company}
											</p>
										</div>
										{exp.description && (
											<div className="text-[13px] font-medium leading-relaxed text-slate-600/90 whitespace-pre-line border-l-2 pl-6" style={{ borderColor: '#f1f5f9' }}>
												{exp.description}
											</div>
										)}
									</div>
								))}
							</div>
						</section>
					)}

					{/* Projects */}
					{data.project && data.project.length > 0 && (
						<section className="space-y-8">
							<div className="flex items-center gap-3">
								<h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] whitespace-nowrap">
									Projects
								</h2>
								<div className="h-[1px] flex-1 bg-slate-200"></div>
							</div>

							<div className="grid grid-cols-1 gap-6">
								{data.project.map((p, index) => (
									<div key={index} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30 space-y-3">
										<div className="flex justify-between items-center">
											<h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
												{p.name}
											</h3>
											<div className="flex gap-4 text-[9px] font-black uppercase tracking-widest">
												{p.codebase_url && (
													<a href={p.codebase_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-accent transition-colors">
														<span>Codebase</span>
														<ArrowUpRight size={10} />
													</a>
												)}
												{p.hosted_url && (
													<a href={p.hosted_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-accent transition-colors">
														<span>Hosted</span>
														<ArrowUpRight size={10} />
													</a>
												)}
											</div>
										</div>
										{p.description && (
											<div className="text-[12.5px] font-medium text-slate-500 leading-relaxed">
												{p.description}
											</div>
										)}
									</div>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
};

export default ModernTemplate;
