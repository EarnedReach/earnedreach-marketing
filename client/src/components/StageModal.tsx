import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileText, Lightbulb, Link as LinkIcon } from "lucide-react";
import { StageDetail } from "@/data/stageDetails";

interface StageModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  } | null;
  detail: StageDetail | null;
}

export function StageModal({ isOpen, onClose, stage, detail }: StageModalProps) {
  if (!stage || !detail) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center text-blue-500">
              {stage.icon}
            </div>
            <div>
              <DialogTitle className="text-lg md:text-2xl">{stage.title}</DialogTitle>
              <p className="text-xs md:text-sm text-slate-600 mt-1">{stage.description}</p>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4 md:mt-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
            <TabsTrigger value="scripts">Scripts</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card className="p-4 md:p-6">
              <p className="text-slate-700 leading-relaxed">{detail.overview}</p>
            </Card>

            {detail.tips.length > 0 && (
              <Card className="p-4 md:p-6 bg-amber-50 border-amber-200">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-2">Tips & Best Practices</h4>
                    <ul className="space-y-2">
                      {detail.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-amber-800 leading-relaxed">
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Checklist Tab */}
          <TabsContent value="checklist" className="mt-4">
            <Card className="p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="font-semibold text-slate-900">Action Items</h4>
              </div>
              <div className="space-y-3">
                {detail.checklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Scripts Tab */}
          <TabsContent value="scripts" className="space-y-4 mt-4">
            {detail.scripts.length === 0 ? (
              <Card className="p-4 md:p-6">
                <p className="text-slate-500 text-center">No scripts available for this stage.</p>
              </Card>
            ) : (
              detail.scripts.map((script, index) => (
                <Card key={index} className="p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-slate-900">{script.title}</h4>
                  </div>
                  <div className="bg-slate-50 p-3 md:p-4 rounded-lg border border-slate-200">
                    <pre className="text-xs md:text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                      {script.content}
                    </pre>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-3 mt-4">
            {detail.resources.length === 0 ? (
              <Card className="p-4 md:p-6">
                <p className="text-slate-500 text-center">No resources available for this stage.</p>
              </Card>
            ) : (
              detail.resources.map((resource, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <LinkIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{resource.title}</h4>
                        <Badge variant="outline" className="text-xs">Link</Badge>
                      </div>
                      <p className="text-sm text-slate-600">{resource.description}</p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
