import { type HTMLElement } from "node-html-parser";

export function fetchFirstSpanText(spans: HTMLElement[], id: string): string {
  const span = spans.filter((span) => span.getAttribute("id")?.includes(id));
  return span[0].text.trim();
}

export function fetchGXStateInputValue(
  document: HTMLElement,
  changer?: (str: string) => string,
): any {
  const input = document.querySelector("input[name='GXState']");
  if (input == null)
    throw new Error("Não foi possível encontrar o input GXState");
  let value = input?.getAttribute("value");
  if (value == null)
    throw new Error("Não foi possível encontrar o valor do input GXState");

  if (changer != null) {
    value = changer(value);
  }

  return JSON.parse(String(value));
}
/*
export function findValueInObject(object: any, value: string): any {
  const objectKeys = Object.keys(object);
  const key = objectKeys.find((key) => key.includes(value));
  if (key == null) throw new Error("Key not found");
  return object[key];
}

/*
export function fetchFirstImageTitle(images: HTMLElement[], id: string): string {
  const image = images.filter((image) => image.getAttribute("id")?.includes(id));
  return image[0].getAttribute("title")?.trim() ?? "";
}
*/
