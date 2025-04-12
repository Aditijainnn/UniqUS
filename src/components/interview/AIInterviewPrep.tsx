
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Play, 
  Pause, 
  SkipForward, 
  Clock, 
  MessageSquareText, 
  ThumbsUp, 
  ThumbsDown, 
  Save,
  UserCheck,
  FileText,
  BookOpen,
  RefreshCcw,
  Bot
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Feedback {
  category: string;
  score: number;
  comment: string;
}

interface Question {
  id: string;
  text: string;
  type: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const AIInterviewPrep = () => {
  const [activeTab, setActiveTab] = useState("preparation");
  const [isRecording, setIsRecording] = useState(false);
  const [videoPaused, setVideoPaused] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [feedbackGenerated, setFeedbackGenerated] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("mathematics");
  const [difficulty, setDifficulty] = useState("intermediate");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Sample questions by subject
  const questionsBySubject: Record<string, Question[]> = {
    mathematics: [
      { 
        id: "m1", 
        text: "Can you explain the concept of the quadratic formula and how to apply it?", 
        type: "technical",
        difficulty: "intermediate" 
      },
      { 
        id: "m2", 
        text: "How would you approach solving a complex calculus problem?", 
        type: "problem-solving",
        difficulty: "advanced" 
      },
      { 
        id: "m3", 
        text: "Explain the applications of algebra in real-life scenarios.", 
        type: "application",
        difficulty: "beginner" 
      },
    ],
    science: [
      { 
        id: "s1", 
        text: "What is the scientific method and how would you apply it to a research project?", 
        type: "methodology",
        difficulty: "beginner" 
      },
      { 
        id: "s2", 
        text: "Explain how DNA replication works and why it's important.", 
        type: "technical",
        difficulty: "intermediate" 
      },
      { 
        id: "s3", 
        text: "Discuss the ethical considerations in genetic engineering.", 
        type: "ethics",
        difficulty: "advanced" 
      },
    ],
    english: [
      { 
        id: "e1", 
        text: "Analyze the themes in Shakespeare's 'Hamlet'.", 
        type: "analysis",
        difficulty: "advanced" 
      },
      { 
        id: "e2", 
        text: "How would you structure a persuasive essay?", 
        type: "methodology",
        difficulty: "intermediate" 
      },
      { 
        id: "e3", 
        text: "Explain the importance of narrative voice in storytelling.", 
        type: "concept",
        difficulty: "beginner" 
      },
    ],
  };

  // Filter questions by selected subject and difficulty
  const filteredQuestions = questionsBySubject[selectedSubject]?.filter(
    q => q.difficulty === difficulty
  ) || [];

  // Mock feedback data
  const mockFeedback: Feedback[] = [
    { 
      category: "Content", 
      score: 85, 
      comment: "Your answer was well-structured and demonstrated good understanding of the concept. Consider adding more examples to illustrate your points." 
    },
    { 
      category: "Clarity", 
      score: 90, 
      comment: "You communicated clearly and your explanations were easy to follow. Great job with using simplified language to explain complex concepts." 
    },
    { 
      category: "Confidence", 
      score: 75, 
      comment: "You appeared somewhat hesitant at times. Practice more to build confidence in your delivery." 
    },
    { 
      category: "Pace", 
      score: 80, 
      comment: "Good pace overall, though you could slow down slightly when explaining key points to emphasize their importance." 
    },
  ];

  const handleStartInterview = () => {
    setActiveTab("interview");
    toast({
      title: "Interview session starting",
      description: "Get ready for your questions!",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setFeedbackGenerated(true);
    toast({
      title: "Recording saved",
      description: "Your response has been recorded and analyzed.",
    });
  };

  const handleNextQuestion = () => {
    setFeedbackGenerated(false);
    setVideoPaused(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    toast({
      title: "Moving to next question",
      description: "Prepare for your next response.",
    });
  };

  const handleSaveFeedback = () => {
    toast({
      title: "Feedback saved",
      description: "Your feedback has been saved to your profile.",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-primary/20 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                AI Interview Preparation
              </CardTitle>
              <CardDescription>
                Practice your interview skills with AI-powered feedback
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="preparation">
                <BookOpen className="h-4 w-4 mr-2" />
                Preparation
              </TabsTrigger>
              <TabsTrigger value="interview">
                <Mic className="h-4 w-4 mr-2" />
                Interview
              </TabsTrigger>
              <TabsTrigger value="feedback" disabled={!feedbackGenerated}>
                <FileText className="h-4 w-4 mr-2" />
                Feedback
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preparation" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Interview Tips</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-medium mb-2">Content Structure</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                            <span>Begin with a clear definition of the concept</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                            <span>Provide illustrative examples</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                            <span>Explain real-world applications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                            <span>Summarize your key points</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-medium mb-2">Delivery Tips</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                            <span>Speak clearly and at a moderate pace</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                            <span>Use appropriate technical vocabulary</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                            <span>Maintain eye contact (with camera)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                            <span>Demonstrate confidence in your knowledge</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Sample Questions</h3>
                  <div className="space-y-2">
                    {filteredQuestions.map((question) => (
                      <div key={question.id} className="p-3 bg-muted rounded-md">
                        <div className="flex justify-between items-start">
                          <p>{question.text}</p>
                          <Badge variant="outline">{question.type}</Badge>
                        </div>
                      </div>
                    ))}
                    {filteredQuestions.length === 0 && (
                      <p className="text-muted-foreground text-center py-6">
                        No questions available for the selected criteria. Try changing the subject or difficulty level.
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={handleStartInterview}
                    disabled={filteredQuestions.length === 0}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Interview Practice
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="interview" className="space-y-4 p-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="relative bg-black rounded-md overflow-hidden aspect-video mb-4">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      src="" // In a real app, this would be a proper video source
                      poster="/placeholder.svg"
                      muted
                    />
                    
                    {!videoEnabled && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <VideoOff className="h-12 w-12 text-white/50" />
                      </div>
                    )}
                    
                    {captionsEnabled && !videoPaused && (
                      <div className="absolute bottom-4 left-0 right-0 bg-black/70 text-white p-2 text-center">
                        "Can you explain the concept of the quadratic formula and how to apply it?"
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className={`h-3 w-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-muted'}`}></div>
                      <div className="bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> 00:45
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Bot className="h-4 w-4 text-primary" />
                        Current Question:
                      </h3>
                      <p className="text-lg">
                        {filteredQuestions[0]?.text || "No question available"}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 justify-between">
                      <div className="space-x-2">
                        <Button
                          variant={isRecording ? "destructive" : "default"}
                          onClick={() => {
                            if (isRecording) {
                              handleStopRecording();
                            } else {
                              setIsRecording(true);
                              setVideoPaused(false);
                            }
                          }}
                        >
                          {isRecording ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" /> Stop Recording
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" /> Start Recording
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleNextQuestion}
                          disabled={!feedbackGenerated}
                        >
                          <SkipForward className="mr-2 h-4 w-4" /> Next Question
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setVideoEnabled(!videoEnabled)}
                          aria-label={videoEnabled ? "Disable video" : "Enable video"}
                        >
                          {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setAudioEnabled(!audioEnabled)}
                          aria-label={audioEnabled ? "Mute audio" : "Unmute audio"}
                        >
                          {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant={captionsEnabled ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCaptionsEnabled(!captionsEnabled)}
                          className="text-xs"
                        >
                          CC
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {feedbackGenerated && (
                <div className="flex justify-center">
                  <Button
                    onClick={() => setActiveTab("feedback")}
                    variant="outline"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Detailed Feedback
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="feedback" className="p-6">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Overall Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center">
                        <div className="relative h-32 w-32">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold">82%</span>
                          </div>
                          <svg
                            className="h-full w-full"
                            viewBox="0 0 100 100"
                          >
                            <circle
                              className="stroke-muted fill-none"
                              strokeWidth="10"
                              cx="50"
                              cy="50"
                              r="40"
                            />
                            <circle
                              className="stroke-primary fill-none"
                              strokeWidth="10"
                              strokeDasharray="251.2"
                              strokeDashoffset="45.2"
                              strokeLinecap="round"
                              transform="rotate(-90 50 50)"
                              cx="50"
                              cy="50"
                              r="40"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => {
                            toast({
                              title: "Positive feedback sent!",
                              description: "Thank you for your feedback",
                            });
                          }}
                        >
                          <ThumbsUp className="h-3 w-3" /> Helpful
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => {
                            toast({
                              title: "Negative feedback sent!",
                              description: "We'll work to improve our feedback",
                            });
                          }}
                        >
                          <ThumbsDown className="h-3 w-3" /> Not Helpful
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Feedback Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted p-3 rounded-md">
                        <p className="italic text-sm">
                          "Your response demonstrated good understanding of the quadratic formula. 
                          Your explanation was clear, though you could improve by providing more 
                          practical examples of when and how the formula is applied in real-world 
                          scenarios."
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">Strength: Clear explanation</Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">Strength: Good understanding</Badge>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100">Improve: More examples</Badge>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100">Improve: Real-world applications</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Detailed Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockFeedback.map((feedback, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{feedback.category}</span>
                            <span className="text-sm">{feedback.score}%</span>
                          </div>
                          <Progress value={feedback.score} className="h-2" />
                          <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                          {index < mockFeedback.length - 1 && <Separator className="my-2" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Your Response Transcript</h3>
                  <Textarea
                    readOnly
                    rows={5}
                    value="The quadratic formula is used to solve quadratic equations in the form ax² + bx + c = 0. The formula is x = (-b ± √(b² - 4ac)) / 2a. To apply it, first identify the values of a, b, and c from your equation, then substitute them into the formula. The ± symbol means you'll get two solutions, which are the x-intercepts of the parabola."
                    className="resize-none"
                  />
                  
                  <h3 className="text-lg font-medium">Add Personal Notes</h3>
                  <Textarea
                    placeholder="Add your reflections and learning points here..."
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("interview")}
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button onClick={handleSaveFeedback}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Feedback
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-muted/30 flex justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="accessibility-mode" />
            <Label htmlFor="accessibility-mode">Accessibility Mode</Label>
          </div>
          <Button variant="outline" size="sm">
            <MessageSquareText className="mr-2 h-4 w-4" />
            Get Help
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIInterviewPrep;
