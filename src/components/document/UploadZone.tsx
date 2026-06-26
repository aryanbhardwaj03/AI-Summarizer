"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, CheckCircle2 } from "lucide-react";
import { cn, formatFileSize, getFileIcon } from "@/lib/utils";
import { SUPPORTED_EXTENSIONS } from "@/lib/constants";
import { apiUploadDocument } from "@/lib/api";
import { showToast } from "@/components/ui/Toaster";

interface UploadZoneProps {
  onUploadComplete?: () => void;
  customButton?: boolean;
}

interface UploadingFile {
  file: File;
  status: "uploading" | "done" | "error";
  error?: string;
}

export function UploadZone({ onUploadComplete, customButton }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState<UploadingFile[]>([]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  }, []);

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter((f) => {
      const ext = "." + f.name.split(".").pop()?.toLowerCase();
      return SUPPORTED_EXTENSIONS.includes(ext);
    });

    if (validFiles.length === 0) {
      showToast("Unsupported file type. Use PDF, DOCX, PPTX, TXT, or MD.", "error");
      return;
    }

    const newUploading: UploadingFile[] = validFiles.map((f) => ({ file: f, status: "uploading" as const }));
    setUploading((prev) => [...prev, ...newUploading]);

    for (const item of newUploading) {
      try {
        await apiUploadDocument(item.file);
        setUploading((prev) => prev.map((u) => u.file === item.file ? { ...u, status: "done" as const } : u));
        showToast(`${item.file.name} uploaded!`, "success");
      } catch (err: any) {
        setUploading((prev) => prev.map((u) => u.file === item.file ? { ...u, status: "error" as const, error: err.message } : u));
        showToast(`Failed to upload ${item.file.name}`, "error");
      }
    }

    // Check if any uploads succeeded
    const anySuccess = newUploading.some((u) => !u.error);
    
    if (anySuccess) {
      if (customButton) {
        setIsAnalyzing(true);
      }
      setTimeout(() => {
        setUploading((prev) => prev.filter((u) => u.status === "uploading"));
        onUploadComplete?.();
      }, customButton ? 2500 : 1500);
    } else {
      setTimeout(() => {
        setUploading((prev) => prev.filter((u) => u.status === "uploading"));
      }, 1500);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-24 h-32 bg-card border-[3px] border-primary rounded-lg shadow-xl flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Glasses icon for "smart" PDF */}
            <div className="absolute top-4 w-12 h-4 bg-gray-200 rounded-sm"></div>
            <div className="absolute top-10 w-16 flex justify-between">
              <div className="w-6 h-6 border-[3px] border-black rounded flex items-center justify-center"><div className="w-2 h-2 bg-black rounded-full animate-pulse"></div></div>
              <div className="w-2 h-1 bg-black mt-2"></div>
              <div className="w-6 h-6 border-[3px] border-black rounded flex items-center justify-center"><div className="w-2 h-2 bg-black rounded-full animate-pulse"></div></div>
            </div>
            <div className="absolute bottom-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">PDF</div>
          </motion.div>
          {/* Scanning line */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute left-[-10px] right-[-10px] h-[3px] bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)] z-10 rounded-full"
          ></motion.div>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <p className="text-gray-400 text-sm">{uploading.find(u => u.status === 'done')?.file.name || 'document.pdf'}</p>
          <h3 className="text-foreground text-2xl font-bold tracking-tight">Analyzing with AI...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        animate={isDragging ? { scale: 1.01 } : { scale: 1 }}
        className={cn(
          "relative transition-all cursor-pointer group flex flex-col items-center justify-center",
          customButton ? "border-none p-0" : "border-2 border-dashed rounded-2xl p-8 text-center",
          isDragging && !customButton ? "border-primary bg-primary/[0.03]" : "",
          !isDragging && !customButton ? "border-border hover:border-primary/30 hover:bg-muted/30" : ""
        )}
      >
        <input type="file" multiple accept=".pdf,.docx,.pptx,.txt,.md" onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />

        {customButton ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="bg-primary hover:opacity-90 text-primary-foreground text-[24px] font-semibold px-[42px] py-[22px] rounded-lg shadow-md transition-opacity flex items-center justify-center min-w-[280px]">
                Select files
              </button>
            </div>
            <p className="text-muted-foreground text-[15px] font-light">
              or drop files here
            </p>
          </div>
        ) : (
          <motion.div animate={isDragging ? { y: -3 } : { y: 0 }} className="space-y-2.5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/[0.08] flex items-center justify-center group-hover:bg-primary/[0.12] transition-colors">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">{isDragging ? "Drop files here" : "Drag & drop documents"}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                PDF, DOCX, PPTX, TXT, or Markdown — up to 50 MB
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Upload progress */}
      <AnimatePresence>
        {uploading.map((item, i) => (
          <motion.div key={item.file.name + i}
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-card border border-border"
          >
            <span className="text-lg">{getFileIcon(item.file.name.split(".").pop() || "")}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{item.file.name}</p>
              <p className="text-[10px] text-muted-foreground">{formatFileSize(item.file.size)}</p>
            </div>
            {item.status === "uploading" && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
            {item.status === "done" && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 className="w-4 h-4 text-emerald-500" /></motion.div>}
            {item.status === "error" && <X className="w-4 h-4 text-red-500" />}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
