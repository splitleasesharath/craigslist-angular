import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@haifahrul/ckeditor5-build-rich';
import Adapter from './ckeditorAdapter';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {

  selectedImage: File | null = null;
  description: string = '';
  imagePreview: string | ArrayBuffer | null = null;

  public Editor = ClassicEditor;

  public ckconfig: any;
  public data = '';

  customColorPalette = [
    { color: '#E64C4C', label: 'Red' },
    { color: '#E6994C', label: 'Orange' },
    { color: '#E6E64C', label: 'Yellow' },
  ];


  constructor() { }

  ngOnInit(): void {
  }

  setupCkEditorConfig() {
    this.ckconfig = {
      toolbar: [
        'undo',
        'redo',
        '|',
        'heading',
        'fontFamily',
        'fontSize',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'fontColor',
        'fontBackgroundColor',
        'highlight',
        '|',
        'link',
        'CKFinder',
        'imageUpload',
        'mediaEmbed',
        '|',
        'alignment',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'insertTable',
        'blockQuote',
        'specialCharacters',
        'removeFormat',
        '|',
        'sourceEditing'
      ],
      fontColor: {
        colors: this.customColorPalette,
        columns: 5,
        documentColors: 10,
        // defaultColor: '#000000', 
      },
      fontSize: {
        options: ['tiny', 'small', 'default', 'big', 'huge'],
        supportAllValues: true
      },
      fontFamily: {
        options: [
          'default',
          'Arial, Helvetica, sans-serif',
          'Courier New, Courier, monospace',
          'Georgia, serif',
          'Lucida Sans Unicode, Lucida Grande, sans-serif',
          'Tahoma, Geneva, sans-serif',
          'Times New Roman, Times, serif',
          'Trebuchet MS, Helvetica, sans-serif',
          'Verdana, Geneva, sans-serif'
        ]
      },
      language: 'en',
      image: {
        toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableProperties',
          'tableCellProperties',
        ],
        tableProperties: {
          borderColors: this.customColorPalette,
          backgroundColors: this.customColorPalette,
          defaultProperties: {
            borderStyle: 'dashed',
            borderColor: 'hsl(90, 75%, 60%)',
            borderWidth: '3px',
            alignment: 'left',
            width: '100px',
            height: '100px',
          },
        },
        tableCellProperties: {
          borderColors: this.customColorPalette,
          backgroundColors: this.customColorPalette,
          defaultProperties: {
            horizontalAlignment: 'center',
            verticalAlignment: 'bottom',
            padding: '10px',
          },
        },
      },
      extraPlugins: [this.customAdapterPlugin],
      customColorPalette: [
        {color: 'hsl(4, 90%, 58%)', label: 'Red'},
        {color: 'hsl(340, 82%, 52%)', label: 'Pink'},
        {color: 'hsl(291, 64%, 42%)', label: 'Purple'},
        {color: 'hsl(262, 52%, 47%)', label: 'Deep Purple'},
        {color: 'hsl(231, 48%, 48%)', label: 'Indigo'},
        {color: 'hsl(207, 90%, 54%)', label: 'Blue'},
        {color: 'hsl(193, 77%, 55%)', label: 'Light Blue'},
        {color: 'hsl(187, 100%, 42%)', label: 'Cyan'},
        {color: 'hsl(174, 100%, 29%)', label: 'Teal'},
        {color: 'hsl(154, 60%, 44%)', label: 'Green'},
        {color: 'hsl(116, 47%, 41%)', label: 'Light Green'},
        {color: 'hsl(87, 57%, 47%)', label: 'Lime'},
        {color: 'hsl(66, 70%, 43%)', label: 'Yellow'},
        {color: 'hsl(36, 100%, 50%)', label: 'Amber'},
        {color: 'hsl(14, 100%, 57%)', label: 'Orange'},
        {color: 'hsl(6, 63%, 50%)', label: 'Deep Orange'},
        {color: 'hsl(0, 0%, 59%)', label: 'Gray'},
        {color: 'hsl(0, 0%, 43%)', label: 'Dark Gray'},
        {color: 'hsl(0, 0%, 29%)', label: 'Very Dark Gray'}
      ],
        // contentStyles: 'body { color: black; }'
    };
  }

  customAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new Adapter(loader, editor.config);
    };
  }

  onReady(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new Adapter(loader, editor.config);
    };
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];

      // Create a FileReader to read the file and create a preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  uploadImage() {
    if (this.selectedImage) {
      // Handle the image upload logic here
      console.log('Image uploaded:', this.selectedImage);
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.imagePreview = null; // Clear the image preview
  }

}
