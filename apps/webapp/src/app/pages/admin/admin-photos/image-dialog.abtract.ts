import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

export abstract class ImageDialogAbstract {
  abstract getForm: FormGroup;

  get tags() {
    return this.getForm.get('tags');
  }

  removeTag(tag: string, index: number): void {
    if (index >= 0) {
      const tags: string[] = [...this.tags.value];
      const tagsSet = new Set(tags);
      tagsSet.delete(tag);
      this.tags.setValue(Array.from(tagsSet));
    }
  }

  addTag(event: MatChipInputEvent): void {
    const { value, input } = event;

    if ((value || '').trim()) {
      const tags: string[] = [...(this.tags?.value ?? [])];
      // This is needed to avoid duplicate tag
      const tagsSet = new Set(tags);
      tagsSet.add(value.trim());
      this.tags.setValue(Array.from(tagsSet));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
}
