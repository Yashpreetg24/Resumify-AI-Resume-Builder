import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react";

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
		<div className="bg-white text-slate-800 min-h-[11in] font-sans selection:bg-indigo-100 p-0 m-0 leading-relaxed overflow-hidden">
			{/* Header Section */}
			<header className="p-16 border-b border-slate-100 bg-slate-50/20">
				<div className="flex flex-col md:flex-row justify-between items-start gap-12">
					<div className="space-y-4 max-w-2xl">
						<h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] uppercase">
							{data.personal_info?.full_name || "Your Name"}
						</h1>
						<div className="h-1.5 w-24 rounded-full" style={accentBgStyle}></div>
						<p className="text-2xl font-bold tracking-widest uppercase opacity-80" style={accentStyle}>
							{data.personal_info?.profession || "Creative Director"}
						</p>
					</div>

					<div className="grid grid-cols-1 gap-y-4 text-[11px] font-bold tracking-wider text-slate-500/90">
						{data.personal_info?.email && (
							<a 
								href={`mailto:${data.personal_info.email}`}
								className="flex items-center gap-4 hover:text-slate-900 transition-colors group/link"
							>
								<div className="size-8 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover/link:border-accent/30 transition-all">
									<Mail size={13} strokeWidth={1.5} style={accentStyle} />
								</div>
								<span className="text-slate-600 font-medium lowercase tracking-normal text-[13px]">{data.personal_info.email}</span>
							</a>
						)}
						{data.personal_info?.phone && (
							<div className="flex items-center gap-4 group/item">
								<div className="size-8 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
									<Phone size={14} strokeWidth={1.5} style={accentStyle} />
								</div>
								<span className="text-slate-600 font-medium text-[13px]">{data.personal_info.phone}</span>
							</div>
						)}
						{data.personal_info?.location && (
							<div className="flex items-center gap-4 group/item">
								<div className="size-8 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
									<MapPin size={14} strokeWidth={1.5} style={accentStyle} />
								</div>
								<span className="text-slate-600 font-medium uppercase tracking-widest text-[11px]">{data.personal_info.location}</span>
							</div>
						)}
						{data.personal_info?.linkedin && (
							<a 
								href={data.personal_info.linkedin} 
								target="_blank" 
								rel="noopener noreferrer"
								className="flex items-center gap-4 hover:text-slate-900 transition-colors group/link"
							>
								<div className="size-8 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover/link:border-accent/30 transition-all">
									<Linkedin size={14} strokeWidth={1.5} style={accentStyle} />
								</div>
								<span className="text-slate-600 font-medium tracking-normal text-[13px]">LinkedIn</span>
							</a>
						)}
						{data.personal_info?.website && (
							<a 
								href={data.personal_info.website} 
								target="_blank" 
								rel="noopener noreferrer"
								className="flex items-center gap-4 hover:text-slate-900 transition-colors group/link"
							>
								<div className="size-8 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover/link:border-accent/30 transition-all">
									<Globe size={14} strokeWidth={1.5} style={accentStyle} />
								</div>
								<span className="text-slate-600 font-medium tracking-normal text-[13px]">Portfolio</span>
							</a>
						)}
					</div>
				</div>
			</header>

			<div className="p-16 grid grid-cols-12 gap-20">
				{/* Left Sidebar (Narrow) */}
				<div className="col-span-12 lg:col-span-4 space-y-16">
					{/* Professional Summary */}
					{data.professional_summary && (
						<section className="space-y-6">
							<div className="flex items-center gap-4">
								<h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] whitespace-nowrap">
									Profile
								</h2>
								<div className="h-[1px] w-full bg-slate-200"></div>
							</div>
							<p className="text-[13.5px] font-medium leading-relaxed text-slate-600/90 text-justify">
								{data.professional_summary}
							</p>
						</section>
					)}

					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section className="space-y-8">
							<div className="flex items-center gap-4">
								<h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] whitespace-nowrap">
									Education
								</h2>
								<div className="h-[1px] w-full bg-slate-200"></div>
							</div>
							<div className="space-y-10">
								{data.education.map((edu, index) => (
									<div key={index} className="space-y-3">
										<h3 className="text-sm font-black text-slate-900 leading-tight">
											{edu.degree}
										</h3>
										<p className="text-[11px] font-bold uppercase tracking-widest leading-tight" style={accentStyle}>
											{edu.institution}
										</p>
										<div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest pt-2">
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
						<section className="space-y-8">
							<div className="flex items-center gap-4">
								<h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] whitespace-nowrap">
									Expertise
								</h2>
								<div className="h-[1px] w-full bg-slate-200"></div>
							</div>
							<div className="flex flex-wrap gap-2.5">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-700 uppercase tracking-widest hover:border-accent transition-all"
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}
				</div>

				{/* Right Column (Wide) */}
				<div className="col-span-12 lg:col-span-8 space-y-20">
					{/* Experience */}
					{data.experience && data.experience.length > 0 && (
						<section className="space-y-12">
							<div className="flex items-center gap-4">
								<h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] whitespace-nowrap">
									Experience
								</h2>
								<div className="h-[1px] w-full bg-slate-200"></div>
							</div>

							<div className="space-y-16">
								{data.experience.map((exp, index) => (
									<div key={index} className="relative group">
										<div className="flex justify-between items-start mb-6">
											<div className="space-y-2">
												<h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none uppercase group-hover:text-accent transition-colors">
													{exp.position}
												</h3>
												<p className="text-[13px] font-bold uppercase tracking-[0.2em] opacity-60">
													{exp.company}
												</p>
											</div>
											<div className="text-[10px] font-black text-slate-400 bg-white px-5 py-2 rounded-full uppercase tracking-widest border border-slate-200 shadow-sm whitespace-nowrap">
												{formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
											</div>
										</div>
										{exp.description && (
											<div className="text-[13.5px] font-medium leading-relaxed text-slate-600/90 whitespace-pre-line border-l-3 pl-8 group-hover:border-accent transition-all duration-300" style={{ borderColor: '#f1f5f9' }}>
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
						<section className="space-y-12">
							<div className="flex items-center gap-4">
								<h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] whitespace-nowrap">
									Projects
								</h2>
								<div className="h-[1px] w-full bg-slate-200"></div>
							</div>

							<div className="grid grid-cols-1 gap-10">
								{data.project.map((p, index) => (
									<div key={index} className="group p-8 rounded-3xl border border-slate-100 bg-slate-50/30 space-y-4 hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all duration-500">
										<div className="flex justify-between items-center">
											<h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
												{p.name}
											</h3>
											<div className="size-10 rounded-full bg-white border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
												<ExternalLink size={14} style={accentStyle} />
											</div>
										</div>
										{p.description && (
											<div className="text-[13px] font-medium text-slate-500 leading-relaxed">
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
