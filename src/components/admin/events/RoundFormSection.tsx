import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoundFormSectionProps {
  control: Control<any>;
}

export function RoundFormSection({ control }: RoundFormSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rounds',
  });

  const addNewRound = () => {
    append({
      name: '',
      description: '',
      duration: 30,
      qualifyCount: null,
      criteria: null,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Rounds</h3>
        <Button type="button" variant="outline" size="sm" onClick={addNewRound}>
          <Plus className="h-4 w-4 mr-1" />
          Add Round
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-lg bg-muted/30">
          <p className="text-muted-foreground">No rounds added yet</p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={addNewRound}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Round
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="pb-2 flex flex-row items-start justify-between">
                <CardTitle className="text-md">Round {index + 1}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="h-8 w-8 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={control}
                  name={`rounds.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Round Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Prelims, Finals" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`rounds.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe this round" rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`rounds.${index}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            placeholder="30"
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value) || 30)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`rounds.${index}.qualifyCount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qualification Count</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="Number of qualifiers"
                            value={field.value || ''}
                            onChange={e =>
                              field.onChange(e.target.value ? Number(e.target.value) : null)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name={`rounds.${index}.criteria`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualification Criteria</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe qualification criteria"
                          rows={2}
                          value={field.value || ''}
                          onChange={e => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
