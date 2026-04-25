import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react";

const ModernTemplate = ({ data }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		if (dateStr.includes(' ') || isNaN(dateStr.split('-')[0])) return dateStr;
		const [year, month] = dateStr.split("-");
		const date = new Date(year, (month || 1) - 1);
		if (isNaN(date.getTime())) return dateStr;
		return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
	};

	return (
		<div className="bg-white text-slate-800 min-h-[11in] font-sans selection:bg-indigo-100 p-0 m-0 leading-relaxed">
			{/* Header Section */}
			<header className="p-12 border-b border-slate-100 bg-slate-50/30">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
					<div className="space-y-2">
						<h1 className="text-5xl font-black font-heading text-primary tracking-tight leading-none uppercase">
							{data.personal_info?.full_name || "Your Name"}
						</h1>
						<p className="text-xl font-bold text-accent tracking-widest uppercase opacity-60">
							{data.personal_info?.profession || "Creative Director"}
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[11px] font-black uppercase tracking-[0.2em] text-secondary/60">
						{data.personal_info?.email && (
							<div className="flex items-center gap-3">
								<Mail size={14} className="text-primary opacity-30" />
								<span>{data.personal_info.email}</span>
							</div>
						)}
						{data.personal_info?.phone && (
							<div className="flex items-center gap-3">
								<Phone size={14} className="text-primary opacity-30" />
								<span>{data.personal_info.phone}</span>
							</div>
						)}
						{data.personal_info?.location && (
							<div className="flex items-center gap-3">
								<MapPin size={14} className="text-primary opacity-30" />
								<span>{data.personal_info.location}</span>
							</div>
						)}
						{data.personal_info?.linkedin && (
							<div className="flex items-center gap-3">
								<Linkedin size={14} className="text-primary opacity-30" />
								<span className="truncate">LinkedIn Profile</span>
							</div>
						)}
					</div>
				</div>
			</header>

			<div className="p-12 grid grid-cols-12 gap-16">
				{/* Left Sidebar (Narrow) */}
				<div className="col-span-12 lg:col-span-4 space-y-12">
					{/* Professional Summary */}
					{data.professional_summary && (
						<section className="space-y-4">
							<h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] border-b border-slate-200 pb-2 inline-block w-full">
								// PROFILE
							</h2>
							<p className="text-[13px] font-medium leading-relaxed text-secondary/80 text-justify">
								{data.professional_summary}
							</p>
						</section>
					)}

					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section className="space-y-6">
							<h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] border-b border-slate-200 pb-2 inline-block w-full">
								// ACADEMICS
							</h2>
							<div className="space-y-8">
								{data.education.map((edu, index) => (
									<div key={index} className="space-y-2">
										<h3 className="text-sm font-black text-primary leading-tight">
											{edu.degree}
										</h3>
										<p className="text-[11px] font-bold text-accent uppercase tracking-widest leading-tight">
											{edu.institution}
										</p>
										<div className="flex justify-between items-center text-[10px] font-black text-secondary/40 uppercase tracking-widest pt-1">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && <span>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section className="space-y-6">
							<h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] border-b border-slate-200 pb-2 inline-block w-full">
								// EXPERTISE
							</h2>
							<div className="flex flex-wrap gap-2">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-primary uppercase tracking-widest"
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}
				</div>

				{/* Right Column (Wide) */}
				<div className="col-span-12 lg:col-span-8 space-y-16">
					{/* Experience */}
					{data.experience && data.experience.length > 0 && (
						<section className="space-y-10">
							<h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] border-b border-slate-200 pb-2 inline-block w-full">
								// CAREER_TRAJECTORY
							</h2>

							<div className="space-y-12">
								{data.experience.map((exp, index) => (
									<div key={index} className="relative group">
										<div className="flex justify-between items-start mb-4">
											<div className="space-y-1">
												<h3 className="text-xl font-black text-primary tracking-tight leading-none uppercase">
													{exp.position}
												</h3>
												<p className="text-sm font-bold text-accent uppercase tracking-widest">
													{exp.company}
												</p>
											</div>
											<div className="text-[10px] font-black text-secondary/40 bg-slate-50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-slate-100">
												{formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
											</div>
										</div>
										{exp.description && (
											<div className="text-[13px] font-medium leading-relaxed text-secondary/80 whitespace-pre-line border-l-2 border-slate-50 pl-6 group-hover:border-accent/30 transition-colors">
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
						<section className="space-y-10">
							<h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] border-b border-slate-200 pb-2 inline-block w-full">
								// PROJECTS
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{data.project.map((p, index) => (
									<div key={index} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-4 hover:border-accent/20 transition-all">
										<h3 className="text-sm font-black text-primary uppercase tracking-wider leading-tight">
											{p.name}
										</h3>
										{p.description && (
											<div className="text-[12px] font-medium text-secondary/70 leading-relaxed">
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
}

export default ModernTemplate;