"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { GripVertical, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/color-picker"

type Stage = {
  id: string
  name: string
  color: string
  isDefault: boolean
  isDisqualifying: boolean
}

export function StageSettings() {
  const [stages, setStages] = useState<Stage[]>([
    { id: "applied", name: "Applied", color: "#94a3b8", isDefault: true, isDisqualifying: false },
    { id: "screening", name: "Screening", color: "#0ea5e9", isDefault: false, isDisqualifying: false },
    { id: "interview", name: "Interview", color: "#8b5cf6", isDefault: false, isDisqualifying: false },
    { id: "assessment", name: "Assessment", color: "#f59e0b", isDefault: false, isDisqualifying: false },
    { id: "offer", name: "Offer", color: "#10b981", isDefault: false, isDisqualifying: false },
    { id: "hired", name: "Hired", color: "#22c55e", isDefault: false, isDisqualifying: false },
    { id: "rejected", name: "Rejected", color: "#ef4444", isDefault: false, isDisqualifying: true },
  ])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(stages)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setStages(items)
  }

  const addStage = () => {
    const newStage: Stage = {
      id: `stage-${Date.now()}`,
      name: "New Stage",
      color: "#64748b",
      isDefault: false,
      isDisqualifying: false,
    }
    setStages([...stages, newStage])
  }

  const removeStage = (id: string) => {
    setStages(stages.filter((stage) => stage.id !== id))
  }

  const updateStage = (id: string, field: keyof Stage, value: any) => {
    setStages(
      stages.map((stage) => {
        if (stage.id === id) {
          return { ...stage, [field]: value }
        }

        // If setting a new default stage, unset the previous default
        if (field === "isDefault" && value === true) {
          return { ...stage, isDefault: stage.id === id }
        }

        return stage
      }),
    )
  }

  const handleSave = () => {
    toast({
      title: "Stages saved",
      description: "Your recruitment stages have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Stages</CardTitle>
          <CardDescription>Configure and customize the stages in your recruitment pipeline.</CardDescription>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="stages">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {stages.map((stage, index) => (
                    <Draggable key={stage.id} draggableId={stage.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center space-x-2 rounded-md border p-3"
                        >
                          <div {...provided.dragHandleProps} className="cursor-grab">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                              <div className="flex-1">
                                <Label htmlFor={`stage-name-${stage.id}`} className="sr-only">
                                  Stage Name
                                </Label>
                                <Input
                                  id={`stage-name-${stage.id}`}
                                  value={stage.name}
                                  onChange={(e) => updateStage(stage.id, "name", e.target.value)}
                                  placeholder="Stage name"
                                />
                              </div>
                              <div className="w-full sm:w-24">
                                <Label htmlFor={`stage-color-${stage.id}`} className="sr-only">
                                  Color
                                </Label>
                                <ColorPicker
                                  color={stage.color}
                                  onChange={(color) => updateStage(stage.id, "color", color)}
                                />
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id={`default-${stage.id}`}
                                  checked={stage.isDefault}
                                  onCheckedChange={(checked) => updateStage(stage.id, "isDefault", checked)}
                                />
                                <Label htmlFor={`default-${stage.id}`}>Default Stage</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id={`disqualifying-${stage.id}`}
                                  checked={stage.isDisqualifying}
                                  onCheckedChange={(checked) => updateStage(stage.id, "isDisqualifying", checked)}
                                />
                                <Label htmlFor={`disqualifying-${stage.id}`}>Disqualifying Stage</Label>
                              </div>
                              <Badge style={{ backgroundColor: stage.color }}>Preview</Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStage(stage.id)}
                            disabled={stages.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove stage</span>
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="mt-4">
            <Button variant="outline" onClick={addStage}>
              <Plus className="mr-2 h-4 w-4" />
              Add Stage
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
