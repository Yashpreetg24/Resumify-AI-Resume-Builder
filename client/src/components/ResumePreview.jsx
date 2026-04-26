import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

const ResumePreview = ({data, template, accentColor, classes = ""}) => {

    const renderTemplate = ()=>{
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor}/>;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor}/>;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor}/>;

            default:
                return <ClassicTemplate data={data} accentColor={accentColor}/>;
        }
    }

  return (
    <div className='w-full bg-gray-100 flex justify-center py-10 print:p-0 print:bg-white'>
      <div 
        id="resume-preview" 
        className={"bg-white shadow-2xl print:shadow-none " + classes}
        style={{ width: '210mm', minHeight: '297mm' }}
      >
        {renderTemplate()}
      </div>

      <style jsx global>
        {`
        @media print {
          /* Hide everything by default */
          body * {
            visibility: hidden !important;
          }
          
          /* Show only the resume-preview and its content */
          #resume-preview, 
          #resume-preview * {
            visibility: visible !important;
          }

          /* Ensure the resume-preview is at the top-left and takes full width */
          #resume-preview {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }

          /* Reset body and html for print */
          html, body {
            width: 210mm !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          @page {
            size: A4;
            margin: 0mm;
          }

          /* Fix for background colors */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        `}
      </style>
    </div>
  )
}

export default ResumePreview
